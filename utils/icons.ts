export function getWeatherIcon(desc: string) {
    const d = desc.toLowerCase();
    if (d.includes('cloud')) return '☁️';
    if (d.includes('rain')) return '🌧️';
    if (d.includes('clear')) return '☀️';
    if (d.includes('snow')) return '❄️';
    if (d.includes('storm')) return '⛈️';
    return '🌤️';
  }
  