import * as React from 'react'
import { CardHeader, Row, Col, Label, Input, Button } from 'reactstrap'

export default class HeaderMainCard extends React.Component<any, {}> {
  render() {
    return (
      <CardHeader>
        <Row>
          <Col>
            <Label for="pokemonFilterName">Filter by name</Label>
            <Input type="text" name="filterName" id="pokemonFilterName"
              value={this.props.nameFilterValue} onChange={this.props.nameFilterOnChange} />
          </Col>
          <Col>
              <Button color="primary" className="float-right" onClick={this.props.handleNewPokemon}><h1>+</h1></Button>
          </Col>
        </Row>
      </CardHeader>
    )
  }
}
