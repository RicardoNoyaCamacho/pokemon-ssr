import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { Pokemons } from '../../pokemons/services/pokemons';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPage implements OnInit {

  private pokemonService = inject(Pokemons);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    if (!id) return;
    this.pokemonService.loadPokemon(id)
      .pipe(
        tap((({ id, name }) => {
          const pageTitle = `#${id} - ${name}`;
          const pageDescription = `Pagina del pokemon ${name}`;
          this.title.setTitle(pageTitle);
          this.meta.updateTag({ name: 'description', content: pageDescription })
          this.meta.updateTag({ name: 'og:title', content: pageTitle })
          this.meta.updateTag({ name: 'og:description', content: pageDescription })
          this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` })
        }))
      )
      .subscribe(this.pokemon.set)
  }

}
