import * as React from 'react'
import { CardDeck} from 'reactstrap'
import PokemonCard from './PokemonCard'

export default class PokemonDeck extends React.Component<any, {}> {
  render() {
    return (
      <CardDeck>
        {this.props.pokemons2show.map((pokemon, index) =>
            <PokemonCard pokemon={pokemon} key={pokemon.id}
              handlePokemonDelete={this.props.handlePokemonDelete}
              handlePokemonView={this.props.handlePokemonView}
            />
          )
        }
      </CardDeck>
    )
  }
}
