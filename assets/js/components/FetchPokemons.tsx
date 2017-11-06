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
  loading: boolean
}

export default class FetchPokemons extends React.Component<{}, FetchPokemonsState> {
  constructor() {
    super()
    this.state = { pokemons: [], loading: true }

    // Get the data from our API.
    fetch('/api/pokemons')
      .then((response) => response.json() as Promise<ApiResponse>)
      .then((data) => {
        this.setState({ pokemons: data.data, loading: false })
      })
  }

  private static renderPokemonsTable(pokemons: Pokemon[]) {
    return (
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
          {pokemons.map((pokemon) =>
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
    )
  }

  public render(): JSX.Element {
    const content = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchPokemons.renderPokemonsTable(this.state.pokemons)

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
