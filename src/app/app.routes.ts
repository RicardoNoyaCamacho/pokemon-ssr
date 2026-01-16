import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons',
    loadComponent: () => import('./pages/pokemons/pokemons-page'),
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pages/pokemon-page/pokemon-page')
  },
  {
    path: '**',
    redirectTo: 'pokemons',
    pathMatch: 'full'
  }
];
