import { RenderMode, ServerRoute } from '@angular/ssr';

const POKEMON_LIMIT = 151;

async function fetchPokemonNames(limit: number): Promise<string[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await response.json();
  return data.results.map((pokemon: { name: string }) => pokemon.name);
}

export const serverRoutes: ServerRoute[] = [
  {
    // RUTA: /pokemons?page=N
    path: 'pokemons',
    // Usamos Prerender para generar el cascarón (index.html).
    // La paginación (?page=N) será manejada por el cliente (navegador)
    // una vez que cargue el JS, o necesitas RenderMode.Server si quieres SSR real por página.
    renderMode: RenderMode.Prerender,
    // ELIMINAMOS getPrerenderParams porque no hay variable ":page" en el path.
  },
  {
    // RUTA: /pokemon/:id
    path: 'pokemon/:id',
    renderMode: RenderMode.Prerender,
    // Aquí SÍ usamos getPrerenderParams porque existe ":id" en el path.
    async getPrerenderParams() {
      const names = await fetchPokemonNames(POKEMON_LIMIT);
      // Asegúrate que tu API de front espere el "name" como ID,
      // ya que aquí estás devolviendo nombres (ej: "bulbasaur") como id.
      return names.map(name => ({ id: name }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
