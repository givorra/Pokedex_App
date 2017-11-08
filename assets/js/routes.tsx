import * as React from 'react'
import { Route } from 'react-router-dom'

import Root from './Root'
import Home from './components/Home'
import Counter from './components/Counter'
import FetchPokemons from './components/FetchPokemons'
import PokemonDetail from './components/PokemonDetail'

export const routes = (
  <Root>
    <Route exact path="/" component={ Home } />
    <Route path="/counter" component={ Counter } />
    <Route path="/fetch-pokemons" component={ FetchPokemons } />
    <Route path="/pokemon-detail" component={ PokemonDetail } />
  </Root>
)
