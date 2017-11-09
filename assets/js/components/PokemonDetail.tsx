import * as React from 'react'
import { Table, Button } from 'reactstrap'
import Pokemon from '../interfaces/IPokemon'

interface IPokemonsDetailState {
  pokemon: Pokemon
  loading: boolean
}

export default class PokemonDetail extends React.Component <{}, IPokemonsDetailState> {
  constructor(props: number) {
      super(props)

      var initialState: IPokemonsDetailState = {
        pokemon: {
          id: this.props.match.params.id,
          name: "",
          description: "",
          evolution_to: "",
          favourite: false,
          type1: "",
          type2: ""
          },
        loading: false
      }
      this.state = initialState
  }

  componentWillMount() {
    this.setState({loading : true})
    // Get the data from our API.
    fetch('/api/pokemons/' + this.state.pokemon.id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ pokemon: data.data, loading: false })
      })
  }

  private renderPokemonFields() {
    return (
    <Table>
      <tr>
        <th> <label> (*) Name: </label> </th>
        <th> <input name="name" type="text" value={this.state.pokemon.name}/> </th>
      </tr>
      <tr>
        <th> <label> (*) Type 1: </label> </th>
        <th> <input name="type1" type="text" value={this.state.pokemon.type1}/> </th>
      </tr>
      <tr>
        <th> <label> Type 2: </label> </th>
        <th> <input name="type2" type="text" value={this.state.pokemon.type2}/> </th>
      </tr>
      <tr>
        <th> <label> Evolution to: </label> </th>
        <th> <input name="evolution_to" type="text" value={this.state.pokemon.evolution_to}/> </th>
      </tr>
      <tr>
        <th> <label> Is favourite </label> </th>
        <th> <input name="favourite" type="Checkbox" checked={this.state.pokemon.favourite}/> </th>
      </tr>
      <tr>
        <th> <label> (*) Description </label> </th>
        <th> <textarea name="description" value={this.state.pokemon.description}/> </th>
      </tr>
    </Table>
    )
  }

  render(): JSX.Element {
    const content = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderPokemonFields()
    return (
      <div>
        <h1>Pokemon Detail</h1>
        <form>
          {content}
          <Button color="primary">Save data</Button>
        </form>
      </div>
    )
  }
}
