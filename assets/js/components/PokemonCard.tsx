import * as React from 'react'
import { Card, CardImg, CardBody, CardTitle, CardText, ButtonGroup, Col, Button }
  from 'reactstrap'

export default class PokemonCard extends React.Component<any, {}> {
  private pcHandlePokemonDelete(pokemonId) {
    this.props.handlePokemonDelete(pokemonId)
  }

  private pcHandlePokemonView(pokemonId) {
    this.props.handlePokemonView(pokemonId)
  }

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
                <Button color="danger" className="w-100" onClick={this.pcHandlePokemonDelete.bind(this, pokemon.id)}>Delete</Button>
              </Col>
              <Col lg={6} className="text-center">
                <Button className="w-100" color="primary" onClick={this.pcHandlePokemonView.bind(this, pokemon.id)}>View</Button>
              </Col>
            </ButtonGroup>
          </CardBody>
        </Card>
      </div>
    )
  }
}
