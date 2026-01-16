import { RenderMode, ServerRoute } from '@angular/ssr';

async function fetchAllPokemonIds(): Promise<number[]> {
  const ids: number[] = [];
  let nextUrl: string | null = 'https://pokeapi.co/api/v2/pokemon?limit=100'; // Comienza con un límite inicial
  while (nextUrl) {
    const response: any = await fetch(nextUrl);
    const data = await response.json();
    ids.push(...data.results.map((_: any, index: number) => ids.length + index + 1)); // Genera IDs secuenciales
    nextUrl = data.next; // Obtiene la URL de la siguiente página
  }
  return ids;
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pokemons/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const ids = await fetchAllPokemonIds();
      return ids.map(id => ({ id: id.toString() })); // Convierte los IDs a cadenas
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
