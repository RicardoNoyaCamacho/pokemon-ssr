import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { PokemonList } from "../../pokemons/components/pokemon-list/pokemon-list";
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { Pokemons } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap, tap } from 'rxjs'; // Usamos switchMap en lugar de llamar manual
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage {

  private pokemonService = inject(Pokemons);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public pokemons = signal<SimplePokemon[]>([]);

  // 1. Fuente de la verdad: La URL convertida a Signal
  public currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map(params => params.get('page') ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page))
    ),
    { initialValue: 1 } // Importante definir valor inicial para evitar nulls
  );

  constructor() {
    // 2. Efecto Reactivo: Cuando currentPage cambia, cargamos los datos.
    // Esto reemplaza al ngOnInit y rompe el bucle de navegación.
    effect(() => {
      this.loadPokemons(this.currentPage());
    });
  }

  public loadPokemons(page: number) {
    // NOTA: Ya NO navegamos aquí. Solo actualizamos el Título y traemos datos.

    this.pokemonService.loadPage(page)
      .pipe(
        // Solo efectos visuales/meta, nada de router.navigate aquí
        tap(() => this.title.setTitle(`Pokemons SSR - Page ${page}`))
      )
      .subscribe(pokemons => {
        this.pokemons.set(pokemons);
      });
  }

  // 3. Método explícito para cambiar de página (usalo en tus botones Next/Prev)
  public changePage(delta: number) {
    const pageToLoad = this.currentPage() + delta;

    this.router.navigate([], {
      queryParams: { page: pageToLoad },
      queryParamsHandling: 'merge' // Mantiene otros params si existen
    });
  }
}
