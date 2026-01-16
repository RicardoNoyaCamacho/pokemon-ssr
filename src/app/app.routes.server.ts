import { RenderMode, ServerRoute } from '@angular/ssr';

const POKEMON_LIMIT = 151;

async function fetchPokemonNames(limit: number): Promise<string[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await response.json();
  return data.results.map((pokemon: { name: string }) => pokemon.name);
}

export const serverRoutes: ServerRoute[] = [
  {
    // Ruta: 'pokemons' (maneja ?page=N)
    path: 'pokemons',
    // Usamos Prerender para generar el "cascarón" de la página.
    // La paginación (?page=N) deberá ser manejada en el cliente
    // o cambiar este modo a RenderMode.Server (SSR) si necesitas SEO en cada página.
    renderMode: RenderMode.Prerender,
  },
  {
    // Ruta: 'pokemon/:id'
    path: 'pokemon/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const names = await fetchPokemonNames(POKEMON_LIMIT);
      // Aquí sí funciona porque ':id' es parte de la ruta
      return names.map(name => ({ id: name }));
    },
  },
  {
    // Fallback para redirecciones
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
