import * as React from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'reactstrap'
import Pokemon from '../interfaces/IPokemon'

// The interface for our API response
interface ApiResponse {
  data: Pokemon[]
}

interface FetchPokemonsState {
  pokemons: Pokemon[]
  pokemons2show: Pokemon[]
  loading: boolean
  name_filter: string
  favourite_filter: boolean
}

export default class FetchPokemons extends React.Component<any, FetchPokemonsState> {
  constructor() {
    super()
    this.state = { pokemons: [],  pokemons2show: [], loading: true, name_filter: '', favourite_filter: false}
    this.handleNameFilterChange = this.handleNameFilterChange.bind(this);
    this.handleFavouriteFilterChange = this.handleFavouriteFilterChange.bind(this);
    this.handleNewPokemon = this.handleNewPokemon.bind(this);

  }

  componentWillMount() {
    this.setState({loading : true})
    // Get the data from our API.
    fetch('/api/pokemons')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ pokemons: data.data,  pokemons2show: data.data, loading: false })
      })
  }

  private applyFilters(name_filter: string, favourite_filter: boolean) {
    var pokemons2show = this.state.pokemons.filter(function(item) {
      return (item.name.toLowerCase().match(name_filter.toLowerCase()) &&
        (favourite_filter == false || item.favourite == true)
      )})
    this.setState({pokemons2show: pokemons2show})
  }

  private handleNameFilterChange(event) {
    this.setState({name_filter: event.target.value})
    this.applyFilters(event.target.value, this.state.favourite_filter)
  }

  private handleFavouriteFilterChange(event) {
    this.setState({favourite_filter: event.target.checked})
    this.applyFilters(this.state.name_filter, event.target.checked)
  }

  private handlePokemonClick(id, event) {
    this.props.history.push('/pokemon-detail/' + id)
  }

  private handleNewPokemon(event) {
    this.props.history.push('/create-pokemon')
  }

  private renderPokemonItems() {
    return this.state.pokemons2show.map((pokemon, index) =>
          <tr key={pokemon.id} onClick={this.handlePokemonClick.bind(this, pokemon.id)} >
                <td>{pokemon.id}</td>
                <td>{pokemon.name}</td>
                <td>{pokemon.description}</td>
                <td>{pokemon.evolution_to}</td>
                <td>{pokemon.favourite}</td>
                <td>{pokemon.type1}</td>
                <td>{pokemon.type2}</td>
          </tr>
      )
  }

  private renderPokemonsTable() {
    let pokemon_items = this.renderPokemonItems()
    return (
      <div>
      <Table hover>
        <tbody>
          <tr>
            <td>
              <label>
                {'Filter by name:  '}
                <input name="name_filter" type="text" value={this.state.name_filter} onChange={this.handleNameFilterChange} />
              </label>
            </td>
            <td>
              <label>
                {'Show favourites only  '}
                <input name="favourite_filter" type="Checkbox" checked={this.state.favourite_filter} onChange={this.handleFavouriteFilterChange} />
              </label>
            </td>
            <td>
              <Button color="primary" onClick={this.handleNewPokemon}>Add new</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Table hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Evolution</th>
            <th>Favourite</th>
            <th>Type 1</th>
            <th>Type 2</th>
          </tr>
        </thead>
        <tbody>
          {pokemon_items}
        </tbody>
      </Table>
      </div>
    )
  }

  public render(): JSX.Element {
    const content = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderPokemonsTable()

    return (
      <div>
        <h1>List of your pokemons</h1>
        {content}
        <br /><br />
      </div>
    )
  }
}
