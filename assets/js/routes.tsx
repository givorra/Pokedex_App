import * as React from 'react'
import { Route } from 'react-router-dom'

import Root from './Root'
import Pokedex from './components/Pokedex'
import PokemonDetail from './components/PokemonDetail'

export const routes = (
  <Root>
    <Route exact path="/" component={ Pokedex } />
    <Route path="/pokemon-detail/:id" component={ PokemonDetail } />
    <Route path="/create-pokemon" component={ PokemonDetail } />
  </Root>
)
