import * as React from 'react'
import { Card, CardImg, CardBody, CardTitle, CardText, ButtonGroup, Col, Button }
  from 'reactstrap'
import IPokemon from '../Interfaces/IPokemon'

const initialState: IPokemonCardState = {
  pokemon: {
    id: 0,
    name: "",
    description: "",
    evolution_to: "",
    favourite: false,
    type1: "",
    type2: ""
    }
}

interface IPokemonCardState {
  pokemon: IPokemon
}

export default class PokemonCard extends React.Component<any, IPokemonCardState> {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentWillMount() {
    if(this.props.pokemon) {
      this.setState({pokemon: this.props.pokemon})
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.pokemon) {
      this.setState({pokemon: nextProps.pokemon})
    }
  }
/*
  private pcHandlePokemonDelete(pokemonId) {
    this.props.handlePokemonDelete(pokemonId)
  }

  private pcHandlePokemonView(pokemonId) {
    this.props.handlePokemonView(pokemonId)
  }
*/
  render() {
    const pokemon = this.props.pokemon
    return (
      <div className="col-lg-6 p-3">
        <Card outline color="primary">
          <CardImg top width="100%" src="/images/pokeball_card.png" alt="Card image cap" />
          <CardBody>
            <CardTitle>{pokemon.name}</CardTitle>
            <CardText>{pokemon.description}</CardText>
            <ButtonGroup  className="w-100">
              <Col lg={6} className="text-center">
                <Button color="danger" className="w-100"
                  onClick={() => this.props.handlePokemonDelete(pokemon.id)}>Delete</Button>
              </Col>
              <Col lg={6} className="text-center">
                <Button className="w-100" color="primary" onClick={() =>
                  this.props.handlePokemonView(pokemon.id)}>View</Button>
              </Col>
            </ButtonGroup>
          </CardBody>
        </Card>
      </div>
    )
  }
}
