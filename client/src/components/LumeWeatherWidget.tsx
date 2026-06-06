import React, { useState, useEffect } from 'react';
import { Sun, CloudRain, CloudLightning, Cloud, Wind, Droplets, MapPin, Crosshair, CloudSnow, CloudFog } from 'lucide-react';

interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  code: number;
  isDay: number;
}

// WMO Weather interpretation codes
const getWeatherDetails = (code: number) => {
  if (code === 0) return { label: 'Clear Sky', icon: <Sun className="text-amber-400" size={26} /> };
  if ([1, 2, 3].includes(code)) return { label: 'Partly Cloudy', icon: <Cloud className="text-gray-300" size={26} /> };
  if ([45, 48].includes(code)) return { label: 'Fog', icon: <CloudFog className="text-gray-400" size={26} /> };
  if ([51, 53, 55, 56, 57].includes(code)) return { label: 'Drizzle', icon: <CloudRain className="text-cyan-300" size={26} /> };
  if ([61, 63, 65, 66, 67].includes(code)) return { label: 'Rain', icon: <CloudRain className="text-blue-400" size={26} /> };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Snow', icon: <CloudSnow className="text-white" size={26} /> };
  if ([80, 81, 82].includes(code)) return { label: 'Showers', icon: <CloudRain className="text-cyan-400" size={26} /> };
  if ([95, 96, 99].includes(code)) return { label: 'Thunderstorm', icon: <CloudLightning className="text-purple-400" size={26} /> };
  return { label: 'Unknown', icon: <Cloud className="text-gray-400" size={26} /> };
};

export default function LumeWeatherWidget() {
  const [zip, setZip] = useState('37090');
  const [locationName, setLocationName] = useState('Lebanon, TN');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWeatherByCoords = async (lat: string | number, lon: string | number, name: string) => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day&temperature_unit=fahrenheit&wind_speed_unit=mph`);
      if (!res.ok) throw new Error("Weather API Error");
      const data = await res.json();
      
      setWeather({
        temp: Math.round(data.current.temperature_2m),
        humidity: Math.round(data.current.relative_humidity_2m),
        windSpeed: Math.round(data.current.wind_speed_10m),
        code: data.current.weather_code,
        isDay: data.current.is_day
      });
      setLocationName(name);
    } catch (err: any) {
      setError('SIGNAL LOST');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByZip = async (zipCode: string) => {
    if (!/^\d{5}$/.test(zipCode)) return;
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
      if (!res.ok) throw new Error("Invalid Zip");
      const data = await res.json();
      const place = data.places[0];
      const name = `${place['place name']}, ${place['state abbreviation']}`;
      await fetchWeatherByCoords(place.latitude, place.longitude, name);
    } catch (err: any) {
      setError('INVALID ZIP');
      setLoading(false);
    }
  };

  const handleGPS = () => {
    if (!navigator.geolocation) {
      setError('GPS UNAVAILABLE');
      return;
    }
    setLoading(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        await fetchWeatherByCoords(latitude, longitude, "GPS LOC");
        setZip('');
      },
      (err) => {
        setError('GPS DENIED');
        setLoading(false);
      }
    );
  };

  // Run once on mount for the default zip
  useEffect(() => {
    fetchWeatherByZip('37090');
  }, []);

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zip) fetchWeatherByZip(zip);
  };

  return (
    <div className="w-full max-w-[280px] rounded-xl overflow-hidden border border-cyan-500/20 bg-black/50 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.1)] font-mono text-cyan-50 text-left mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 to-black/60">
        <div className="flex items-center gap-2">
          <MapPin size={12} className="text-cyan-400" />
          <span className="text-[11px] font-bold tracking-widest text-cyan-200 uppercase truncate max-w-[160px]">{locationName}</span>
        </div>
        <button onClick={handleGPS} title="Use GPS" className="p-1 rounded hover:bg-cyan-500/20 transition-colors border border-transparent hover:border-cyan-500/30">
          <Crosshair size={12} className="text-cyan-400" />
        </button>
      </div>

      {/* Main Body */}
      <div className="p-3 flex gap-3 items-center min-h-[70px]">
        {loading ? (
          <div className="flex-1 text-center py-2 text-cyan-500/50 text-xs font-bold tracking-widest animate-pulse">ACQUIRING SIGNAL...</div>
        ) : error ? (
          <div className="flex-1 text-center py-2 text-red-400 text-xs font-bold tracking-widest animate-pulse">{error}</div>
        ) : weather ? (
          <>
            <div className="flex flex-col items-center justify-center p-2 bg-black/60 rounded-lg border border-cyan-500/15 shadow-inner min-w-[64px]">
               {getWeatherDetails(weather.code).icon}
               <span className="text-[9px] text-cyan-400 mt-1 text-center leading-none tracking-wider font-bold">
                 {getWeatherDetails(weather.code).label}
               </span>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-3xl font-black text-white tracking-tighter leading-none mb-1" style={{ textShadow: '0 0 12px rgba(6,182,212,0.4)' }}>
                {weather.temp}°<span className="text-lg text-cyan-500 font-bold opacity-80">F</span>
              </div>
              
              <div className="flex gap-2 text-[9px] text-cyan-200 font-bold tracking-wider">
                <div className="flex items-center gap-1 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-500/20 shadow-inner">
                  <Wind size={9} className="text-cyan-400"/> {weather.windSpeed} mph
                </div>
                <div className="flex items-center gap-1 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-500/20 shadow-inner">
                  <Droplets size={9} className="text-cyan-400"/> {weather.humidity}%
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* Footer / Input */}
      <div className="px-3 py-2 border-t border-cyan-500/20 bg-black/80 flex items-center">
        <form onSubmit={handleZipSubmit} className="flex w-full gap-2 items-center">
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
            placeholder="ENTER ZIP"
            className="w-full bg-transparent border-none text-[10px] font-bold text-cyan-100 placeholder:text-cyan-500/30 focus:outline-none focus:ring-0 uppercase p-0 h-4"
          />
          <button type="submit" disabled={loading} className="text-[9px] text-cyan-300 hover:text-white font-black px-2 py-0.5 rounded border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-600/40 hover:border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.2)] transition-all disabled:opacity-50 tracking-widest">
            SCAN
          </button>
        </form>
      </div>
    </div>
  );
}
