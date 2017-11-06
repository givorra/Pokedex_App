import * as React from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'reactstrap'

// The interface for our API response
interface ApiResponse {
  data: Pokemon[]
}

// The interface for our pokemon model.
interface Pokemon {
  id: number
  name: string
  description: string
  evolution_to: string
  favourite: boolean
  tipe1: string
  tipe2: string
}

interface FetchPokemonsState {
  pokemons: Pokemon[]
  pokemons2show: Pokemon[]
  loading: boolean
  name_filter: string
  favourite_filter: boolean
}

export default class FetchPokemons extends React.Component<{}, FetchPokemonsState> {
  constructor() {
    super()
    this.state = { pokemons: [],  pokemons2show: [], loading: true, name_filter: '', favourite_filter: false}
    this.handleNameFilterChange = this.handleNameFilterChange.bind(this);
    this.handleFavouriteFilterChange = this.handleFavouriteFilterChange.bind(this);

    // Get the data from our API.
    fetch('/api/pokemons')
      .then((response) => response.json() as Promise<ApiResponse>)
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

  private renderPokemonsTable() {
    return (
      <form>
        <label>
          Filter by name:
          <input name="name_filter" type="text" value={this.state.name_filter} onChange={this.handleNameFilterChange} />
        </label>
        <label>
          Show favourites only
          <input name="favourite_filter" type="Checkbox" checked={this.state.favourite_filter} onChange={this.handleFavouriteFilterChange} />
        </label>
        <Table>
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
            {this.state.pokemons2show.map((pokemon) =>
              <tr key={pokemon.id}>
                <td>{pokemon.id}</td>
                <td>{pokemon.name}</td>
                <td>{pokemon.description}</td>
                <td>{pokemon.evolution_to}</td>
                <td>{pokemon.favourite}</td>
                <td>{pokemon.tipe1}</td>
                <td>{pokemon.tipe2}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </form>
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
        <p><Link to="/">Back to home</Link></p>
      </div>
    )
  }
}
