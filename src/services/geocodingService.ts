// Simple fake geocoding / reverse geocoding service (offline stub)
// Provides deterministic coordinates for given address tokens and vice versa.

export interface GeocodeResult {
  address: string;
  lat: number;
  lng: number;
}

const SAMPLE_POINTS: GeocodeResult[] = [
  { address: "Dom rodzinny, Warszawa", lat: 52.2297, lng: 21.0122 },
  { address: "Szkoła Podstawowa nr 5, Warszawa", lat: 52.2315, lng: 21.005 },
  { address: "Praca - Biuro Centrum, Warszawa", lat: 52.2341, lng: 21.0168 },
  { address: "Park Łazienki Królewskie, Warszawa", lat: 52.2149, lng: 21.0362 },
  { address: "Sklep Spożywczy, Warszawa", lat: 52.2264, lng: 21.0001 },
  { address: "Basen Miejski, Warszawa", lat: 52.2222, lng: 21.018 },
  { address: "Stadion, Warszawa", lat: 52.239, lng: 21.045 },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const geocodingService = {
  async autocomplete(query: string) {
    if (!query || query.trim().length < 2) return [] as GeocodeResult[];
    await delay(150);
    const q = query.toLowerCase();
    return SAMPLE_POINTS.filter((p) =>
      p.address.toLowerCase().includes(q)
    ).slice(0, 6);
  },
  async geocode(address: string) {
    await delay(120);
    return (
      SAMPLE_POINTS.find(
        (p) => p.address.toLowerCase() === address.toLowerCase()
      ) ||
      SAMPLE_POINTS.find((p) =>
        p.address.toLowerCase().includes(address.toLowerCase())
      ) ||
      null
    );
  },
  async reverse(lat: number, lng: number) {
    await delay(120);
    // naive closest
    let best = SAMPLE_POINTS[0];
    let bestDist = Infinity;
    for (const p of SAMPLE_POINTS) {
      const d = Math.hypot(p.lat - lat, p.lng - lng);
      if (d < bestDist) {
        bestDist = d;
        best = p;
      }
    }
    return best;
  },
};
