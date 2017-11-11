import * as React from 'react'
import { Table, Button } from 'reactstrap'
import Pokemon from '../interfaces/IPokemon'

interface IPokemonsPost {
  pokemon: Pokemon
}

interface IPokemonsDetailState {
  pokemon: Pokemon
  loading: boolean
  mode: number
}

export default class PokemonDetail extends React.Component <{}, IPokemonsDetailState> {
  constructor(props: number) {
      super(props)
      this.handleName = this.handleName.bind(this)
      this.handleType1 = this.handleType1.bind(this)
      this.handleType2 = this.handleType2.bind(this)
      this.handleFavourite = this.handleFavourite.bind(this)
      this.handleDescription = this.handleDescription.bind(this)
      this.handleEvolutionTo = this.handleEvolutionTo.bind(this)
      this.handleSaveData = this.handleSaveData.bind(this)

      /*if (this.props.match.url.match("pokemon-detail"))
      {

      }*/

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
    // Get the data from our API.
    if (this.props.match.url.match("pokemon-detail"))
    {
      this.setState({loading : true})
      fetch('/api/pokemons/' + this.state.pokemon.id)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ pokemon: data.data, loading: false })
        })
    }
  }

  private renderPokemonFields() {
    return (
    <Table>
      <tr>
        <th> <label> (*) Name: </label> </th>
        <th> <input name="name" type="text" value={this.state.pokemon.name} onChange={this.handleName}/> </th>
      </tr>
      <tr>
        <th> <label> (*) Type 1: </label> </th>
        <th> <input name="type1" type="text" value={this.state.pokemon.type1} onChange={this.handleType1}/> </th>
      </tr>
      <tr>
        <th> <label> Type 2: </label> </th>
        <th> <input name="type2" type="text" value={this.state.pokemon.type2} onChange={this.handleType2}/> </th>
      </tr>
      <tr>
        <th> <label> Evolution to: </label> </th>
        <th> <input name="evolution_to" type="text" value={this.state.pokemon.evolution_to} onChange={this.handleEvolutionTo}/> </th>
      </tr>
      <tr>
        <th> <label> Is favourite </label> </th>
        <th> <input name="favourite" type="Checkbox" checked={this.state.pokemon.favourite} onChange={this.handleFavourite}/> </th>
      </tr>
      <tr>
        <th> <label> (*) Description </label> </th>
        <th> <textarea name="description" value={this.state.pokemon.description} onChange={this.handleDescription}/> </th>
      </tr>
    </Table>
    )
  }

  private handleName(event) {
    let pokemon = this.state.pokemon
    pokemon.name = event.target.value
    this.setState({ pokemon: pokemon })
  }

  private handleType1(event) {
    let pokemon = this.state.pokemon
    pokemon.type1 = event.target.value
    this.setState({ pokemon: pokemon })

  }
  private handleType2(event) {
    let pokemon = this.state.pokemon
    pokemon.type2 = event.target.value
    this.setState({ pokemon: pokemon })

  }
  private handleFavourite(event) {
    let pokemon = this.state.pokemon
    pokemon.favourite = event.target.checked
    this.setState({ pokemon: pokemon })

  }
  private handleDescription(event) {
    let pokemon = this.state.pokemon
    pokemon.description = event.target.value
    this.setState({ pokemon: pokemon })

  }
  private handleEvolutionTo(event) {
    let pokemon = this.state.pokemon
    pokemon.evolution_to = event.target.value
    this.setState({ pokemon: pokemon })

  }

  private persistData() {
    const headers = new Headers()
    //headers.append("Accept", "application/json")
    headers.append('Content-Type', 'application/json')

    fetch('/api/pokemons',
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({"pokemon": this.state.pokemon})

        })
      .then((response) => response.json())
      .then((data) =>  alert( JSON.stringify( data )))
  }

  private handleSaveData() {
    this.persistData()
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
          <Button color="primary" onClick={this.handleSaveData}>Save data</Button>
        </form>
      </div>
    )
  }
}
