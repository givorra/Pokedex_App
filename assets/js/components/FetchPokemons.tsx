import * as React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardImg, CardText, CardDeck, CardBody, CardTitle, CardSubtitle, CardHeader,
  Table, Button, Col, ButtonGroup, Form, FormGroup, Input, Label, Header, Row,
  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Pokemon from '../interfaces/IPokemon'

const modalDefault: IModal = { isOpen: false, title: "", body: "", hiddenBtnDelete: true,
  hiddenBtnOk: true, hiddenBtnCancel: true, idPokemonSelected: 0}
const titleDeletePokemon = "Delete Pokemon"
const bodyDeletePokemon = "¿Are you sure you want to delete this pokemon?"
// The interface for our API response
interface ApiResponse {
  data: Pokemon[]
}

interface IModal {
  isOpen: boolean
  title: string
  body: string
  hiddenBtnDelete: boolean
  hiddenBtnOk: boolean
  hiddenBtnCancel: boolean
  idPokemonSelected: number
}

interface FetchPokemonsState {
  pokemons: Pokemon[]
  pokemons2show: Pokemon[]
  loading: boolean
  name_filter: string
  favourite_filter: boolean
  modal: IModal
}

export default class FetchPokemons extends React.Component<any, FetchPokemonsState> {
  constructor() {
    super()
    this.state = { pokemons: [],  pokemons2show: [], loading: true, name_filter: '',
      favourite_filter: false, modal: modalDefault}
    this.handleNameFilterChange = this.handleNameFilterChange.bind(this)
    this.handleFavouriteFilterChange = this.handleFavouriteFilterChange.bind(this)
    this.handleNewPokemon = this.handleNewPokemon.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleModalDelete = this.handleModalDelete.bind(this)
  }

  componentWillMount() {
    this.getPokemonsToState()
  }

  private getPokemonsToState() {
    this.setState({loading : true})
    // Get the data from our API.
    fetch('/api/pokemons')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ pokemons: data.data, loading: false })
        this.applyFilters(data.data, this.state.name_filter, this.state.favourite_filter)
      })
  }

  private applyFilters(pokemons, name_filter: string, favourite_filter: boolean) {
    var pokemons2show = this.state.pokemons.filter(function(item) {
      return (item.name.toLowerCase().match(name_filter.toLowerCase()) &&
        (favourite_filter == false || item.favourite == true)
      )})
    this.setState({pokemons2show: pokemons2show})
  }

  private handleNameFilterChange(event) {
    this.setState({name_filter: event.target.value})
    this.applyFilters(this.state.pokemons, event.target.value, this.state.favourite_filter)
  }

  private handleFavouriteFilterChange(event) {
    this.setState({favourite_filter: event.target.checked})
    this.applyFilters(this.state.pokemons, this.state.name_filter, event.target.checked)
  }

  private handlePokemonClick(id, event) {
    this.props.history.push('/pokemon-detail/' + id)
  }

  private handleNewPokemon(event) {
    this.props.history.push('/create-pokemon')
  }

  private handleDeletePokemonClick(id, event) {
    let modal = Object.assign({}, modalDefault);
    modal.isOpen = true
    modal.title = titleDeletePokemon
    modal.body = bodyDeletePokemon
    modal.hiddenBtnDelete = false
    modal.hiddenBtnCancel = false
    modal.idPokemonSelected = id
    this.setState({modal: modal})
  }

  private handleModalClose() {
    this.setState({modal: modalDefault})
  }

  private handleModalDelete() {
    let modal = Object.assign({}, modalDefault);
    modal.title = titleDeletePokemon
    modal.isOpen = true
    modal.hiddenBtnOk = false

    fetch('/api/pokemons/' + this.state.modal.idPokemonSelected, { method: "DELETE"})
      .then((response) => {
        if(response.ok)
        {
          modal.body = "Succes!"
          this.getPokemonsToState()
        }
        else {
          modal.body = "Error: " + response.status + " " + response.statusText
        }
        this.setState({ modal: modal})
      })
  }

  private renderPokemonItems() {
    return (
      <CardDeck>
      {this.state.pokemons2show.map((pokemon, index) =>
        <div className="w-50 p-3" key={pokemon.id}>
          <Card key={pokemon.id} outline color="primary">
            <CardImg top width="100%" src="/images/pokeball_card.png" alt="Card image cap" />
            <CardBody>
              <CardTitle>{pokemon.name}</CardTitle>
              <CardText>{pokemon.description}</CardText>
              <ButtonGroup  className="w-100">
                <Button color="danger" className="w-50" onClick={this.handleDeletePokemonClick.bind(this, pokemon.id)}>Delete</Button>
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
    <CardHeader>
      <Row>
        <Col>
          <Label for="pokemonFilterName">Filter by name</Label>
          <Input type="text" name="filterName" id="pokemonFilterName"
            value={this.state.name_filter} onChange={this.handleNameFilterChange} />
        </Col>{' '}
        <Col>
            <Button color="primary" className="float-right" onClick={this.handleNewPokemon}><h1>+</h1></Button>
        </Col>
      </Row>
    </CardHeader>
    )
  }

  private renderModal() {
    return (
      <Modal isOpen={this.state.modal.isOpen} >
        <ModalHeader>{this.state.modal.title}</ModalHeader>
        <ModalBody>{this.state.modal.body}</ModalBody>
        <ModalFooter>
          <Button color="secondary" hidden={this.state.modal.hiddenBtnCancel}
            onClick={this.handleModalClose}>Cancel</Button>
          <Button color="primary" hidden={this.state.modal.hiddenBtnOk}
            onClick={this.handleModalClose}>Ok</Button>
          <Button color="primary" hidden={this.state.modal.hiddenBtnDelete}
            onClick={this.handleModalDelete}>Delete</Button>
        </ModalFooter>
      </Modal>
    )
  }

  public render(): JSX.Element {
    const content = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderPokemonItems()

    const filters = this.renderFilters()
    const modal = this.renderModal()

    return (
      <div>
        {modal}
        <Card >
          <CardImg top width="100%" src="/images/my_pokedex_logo.png" alt="Card image cap"/>
            {filters}
          <CardBody>
            <Label check>
              <Input type="checkbox" checked={this.state.favourite_filter} onChange={this.handleFavouriteFilterChange}/>
              Show only favourites
            </Label>
            {content}
            <br /><br />
          </CardBody>
        </Card>
      </div>
    )
  }
}
