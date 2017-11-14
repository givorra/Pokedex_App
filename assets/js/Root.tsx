import * as React from 'react'
import { Container } from 'reactstrap'

export default class Root extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Container className="mt-4">

          <main role="main">
            {this.props.children}
          </main>
        </Container>
      </div>
    )
  }
}
