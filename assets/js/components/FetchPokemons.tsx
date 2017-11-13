import * as React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardImg, CardText, CardDeck, CardBody, CardTitle, CardSubtitle,
  Table, Button, Col, ButtonGroup, Form, FormGroup, Input, Label } from 'reactstrap'
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
    return (
      <CardDeck>
      {this.state.pokemons2show.map((pokemon, index) =>
        <div className="w-50 p-3" key={pokemon.id}>
          <Card key={pokemon.id} outline color="primary">
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
            <CardBody>
              <CardTitle>{pokemon.name}</CardTitle>
              <CardText>{pokemon.description}</CardText>
              <ButtonGroup  className="w-100">
                <Button color="danger" className="w-50">Delete</Button>
                <Col sm={2} />
                <Button color="primary" className="w-50" onClick={this.handlePokemonClick.bind(this, pokemon.id)}>View</Button>
              </ButtonGroup>
            </CardBody>
          </Card>
        </div>
        )
      }
      </CardDeck>
    )
  }

  private renderFilters() {
    return (
      <Form inline>
        <Col>
          <FormGroup row>
            <Label for="pokemonFilterName">Filter by name</Label>
            <Col sm={1} />
            <Input type="text" name="filterName" id="pokemonFilterName"
              value={this.state.name_filter} onChange={this.handleNameFilterChange} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label check>
              <Input type="checkbox" checked={this.state.favourite_filter} onChange={this.handleFavouriteFilterChange}/>
              Show only favourites
            </Label>
          </FormGroup>
        </Col>
      </Form>
      )
  }

  public render(): JSX.Element {
    const content = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderPokemonItems()

    const filters = this.renderFilters()

    return (
      <div>
        <h1>List of your pokemons</h1>
        <br />
        {filters}
        {content}
        <br /><br />
      </div>
    )
  }
}
