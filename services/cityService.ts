const API_KEY = '34521ea84fmshd1ff39a9d5c0fb5p18ea51jsn106bc915c220';

export async function fetchCitySuggestions(query: string) {
  const res = await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5&types=CITY`,
    {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },
    }
  );

  const json = await res.json();
  return json.data.map((city: any) => `${city.city}, ${city.country}`);
}
