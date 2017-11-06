import * as React from 'react'
import { Link } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import { Jumbotron, Button, Row, Col } from 'reactstrap'

export default class Home extends React.Component<{}, {}> {
  constructor(props) {
    super(props)
  }

  public render(): JSX.Element {
    return (
      <div>
        <Jumbotron>
          <h2>Welcome to Phoenix!</h2>
          <p className="lead">A productive web framework that<br />does not compromise speed and maintainability.</p>
        </Jumbotron>

        <Row className="marketing">
          <Col lg="4">
            <h4>Examples</h4>
            <ul>
              <li>
                <Link to="/counter">Counter</Link>
              </li>
              <li>
                <Link to="/fetch-pokemons">Fetch Pokemons</Link>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    )
  }
}
