import { createHash, randomBytes } from "crypto";
import { db } from "./db";
import { hallmarks, trustStamps, hallmarkCounter } from "@shared/schema";
import { eq, sql } from "drizzle-orm";

const TRUST_LAYER_URL = process.env.TRUST_LAYER_URL || 'https://dwtl.io';

function sha256(data: string): string {
  return createHash("sha256").update(data).digest("hex");
}

/**
 * Register a hallmark with Trust Layer Hub.
 * Falls back to local SHA-256 hashing if Hub is unreachable.
 */
async function registerWithTrustLayer(params: {
  appId?: string;
  appName?: string;
  productName?: string;
  releaseType?: string;
  metadata?: string;
  dataHash: string;
}): Promise<{ txHash: string; blockHeight: string; verificationMethod: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(`${TRUST_LAYER_URL}/api/hallmark/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appId: params.appId,
        appName: params.appName,
        productName: params.productName,
        releaseType: params.releaseType,
        metadata: params.metadata ? JSON.parse(params.metadata) : undefined,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      const hallmark = data.hallmark || data;
      if (hallmark?.txHash && hallmark?.blockHeight) {
        console.log(`[Hallmark] Registered with Trust Layer Hub: ${hallmark.thId || 'OK'}`);
        return {
          txHash: hallmark.txHash,
          blockHeight: hallmark.blockHeight,
          verificationMethod: "trust-layer-hub",
        };
      }
    }

    console.warn(`[Hallmark] Trust Layer Hub returned non-OK (${response.status}), using local hash`);
  } catch (error: any) {
    console.warn(`[Hallmark] Trust Layer Hub unreachable (${error.message}), using local hash`);
  }

  // Fallback: local SHA-256 hash verification
  return {
    txHash: "0x" + params.dataHash,
    blockHeight: "local",
    verificationMethod: "sha256-local",
  };
}

export async function generateHallmark(params: {
  userId?: string;
  appId?: string;
  appName?: string;
  productName?: string;
  releaseType?: string;
  metadata?: string;
}) {
  const result = await db
    .insert(hallmarkCounter)
    .values({ id: "ds-master", currentSequence: "1" })
    .onConflictDoUpdate({
      target: hallmarkCounter.id,
      set: {
        currentSequence: sql`(CAST(${hallmarkCounter.currentSequence} AS integer) + 1)::text`,
      },
    })
    .returning();

  const sequence = parseInt(result[0].currentSequence, 10);
  const thId = `DS-${String(sequence).padStart(8, "0")}`;

  const payload = JSON.stringify({
    thId,
    appId: params.appId,
    appName: params.appName,
    productName: params.productName,
    releaseType: params.releaseType,
    metadata: params.metadata,
    timestamp: new Date().toISOString(),
  });

  const dataHash = sha256(payload);

  // Register with Trust Layer Hub (falls back to local hash if unreachable)
  const { txHash, blockHeight } = await registerWithTrustLayer({
    ...params,
    dataHash,
  });

  const verificationUrl = `https://darkwavestudios.io/hallmark/${thId}/verify`;

  const [hallmark] = await db
    .insert(hallmarks)
    .values({
      thId,
      userId: params.userId ?? null,
      appId: params.appId ?? null,
      appName: params.appName ?? null,
      productName: params.productName ?? null,
      releaseType: params.releaseType ?? null,
      metadata: params.metadata ?? null,
      dataHash,
      txHash,
      blockHeight,
      verificationUrl,
      hallmarkId: sequence,
    })
    .returning();

  return hallmark;
}

export async function createTrustStamp(params: {
  userId?: string;
  category: string;
  data?: string;
}) {
  const payload = JSON.stringify({
    category: params.category,
    data: params.data,
    timestamp: new Date().toISOString(),
  });

  const dataHash = sha256(payload);

  // Trust stamps also go through the Hub
  const { txHash, blockHeight } = await registerWithTrustLayer({
    appId: "darkwave-trust-stamp",
    appName: "DarkWave Studios",
    productName: params.category,
    releaseType: "trust-stamp",
    dataHash,
  });

  const [stamp] = await db
    .insert(trustStamps)
    .values({
      userId: params.userId ?? null,
      category: params.category,
      data: params.data ?? null,
      dataHash,
      txHash,
      blockHeight,
    })
    .returning();

  return stamp;
}

export async function seedGenesisHallmark() {
  const existing = await db
    .select()
    .from(hallmarks)
    .where(eq(hallmarks.thId, "DS-00000001"))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  await db
    .insert(hallmarkCounter)
    .values({ id: "ds-master", currentSequence: "0" })
    .onConflictDoUpdate({
      target: hallmarkCounter.id,
      set: { currentSequence: "0" },
    });

  const genesisMetadata = JSON.stringify({
    ecosystem: "Trust Layer",
    version: "1.0.0",
    domain: "darkwavestudio.tlid.io",
    operator: "DarkWave Studios LLC",
    chain: "Trust Layer",
    consensus: "Proof of Trust",
    launchDate: "2026-08-23T00:00:00.000Z",
    nativeAsset: "SIG",
    utilityToken: "Shells",
    parentApp: "Trust Layer Hub",
    parentGenesis: "TH-00000001",
  });

  return generateHallmark({
    appId: "darkwave-studio-genesis",
    appName: "DarkWave Studio",
    productName: "Genesis Block",
    releaseType: "genesis",
    metadata: genesisMetadata,
  });
}

export async function verifyHallmark(hallmarkId: string) {
  const [hallmark] = await db
    .select()
    .from(hallmarks)
    .where(eq(hallmarks.thId, hallmarkId))
    .limit(1);

  if (!hallmark) {
    return { verified: false, hallmark: null };
  }

  return { verified: true, hallmark };
}
