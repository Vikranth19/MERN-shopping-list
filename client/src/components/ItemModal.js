import React, {useState} from 'react'
import {
    Button,
    FormGroup,
    Modal,
    Form,
} from 'react-bootstrap'
import {useDispatch } from 'react-redux'
import {addItem} from '../actions/itemActions';


function ItemModal() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = e => {
      setName(e.target.value);
  }

  const onSubmit = e =>{
      e.preventDefault();

      const newItem = {
          name: name
      }
     dispatch(addItem(newItem));
     setShow(false);
    }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        ADD ITEM
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        <Modal.Title>Add item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <FormGroup>
                    <label for="item">Item</label>
                    <input type="text" name="name" id="item" placeholder="Add shopping item" onChange={onChange}/>
                </FormGroup>
            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button onClick={onSubmit} variant="primary">Add item</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ItemModal
