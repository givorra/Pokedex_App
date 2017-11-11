import * as React from 'react'
import { Route } from 'react-router-dom'

import Root from './Root'
import FetchPokemons from './components/FetchPokemons'
import PokemonDetail from './components/PokemonDetail'

export const routes = (
  <Root>
    <Route exact path="/" component={ FetchPokemons } />
    <Route path="/pokemon-detail/:id" component={ PokemonDetail } />
    <Route path="/create-pokemon" component={ PokemonDetail } />
  </Root>
)
