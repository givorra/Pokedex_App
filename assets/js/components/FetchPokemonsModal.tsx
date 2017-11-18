import * as React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

export default class FetchPokemonsModal extends React.Component<any, {}> {
  render() {
    return (
      <Modal isOpen={this.props.modalIsOpen} >
        <ModalHeader>{this.props.modalTitle}</ModalHeader>
        <ModalBody>{this.props.modalBody}</ModalBody>
        <ModalFooter>
          <Button color="secondary" hidden={this.props.modalBtnCancelHidden}
            onClick={this.props.modalBtnCancelClick}>Cancel</Button>
          <Button color="primary" hidden={this.props.modalBtnOkHidden}
            onClick={this.props.modalBtnOkClick}>Ok</Button>
          <Button color="primary" hidden={this.props.modalBtnDeleteHidden}
            onClick={this.props.modalBtnDeleteClick}>Delete</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
