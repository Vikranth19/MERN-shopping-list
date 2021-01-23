import React,{useEffect, useState} from 'react'
import {Container, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import {getItems, deleteItem, updateItem} from '../actions/itemActions';


function ShoppingList() {
    // const [items, setItems] = useState([]);
    // console.log(items);

    const [editItemNo,setEditItem] = useState(0);
    const [editedName, setEditedName] = useState('');
    const [isEdited, setEdited] = useState(false);

    const items = useSelector(state => state.item.items);

    

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItems());
    }, [])

    useEffect(() => {
        setEdited(true);
        setEditedName('');
        setEditItem(0);
    }, [items])

    const onDeleteClick = (id) => {
        dispatch(deleteItem(id));
    }

    const onChange = e => {
      setEditedName(e.target.value);
    }

    const updateHandler = () =>{
        const updatedBody = {
            name: editedName
        }
        dispatch(updateItem(updatedBody,editItemNo));
    }

    return (
        <Container>
        <ListGroup>
            {
             items.length==0?'Add items to your shopping list'
                :
            <TransitionGroup className="shopping-list">
                {
                    items.map(({_id,name}) =>(
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                            {
                                isAuthenticated && (editItemNo!==_id) && isEdited?
                                <ListGroupItem className="item">
                                        <Button 
                                        className="remove-btn" 
                                        variant="danger"
                                        size="sm"
                                        onClick={() => onDeleteClick(_id)}
                                        >&times;</Button>
                                        {name}
                                        <Button className="edit-btn" size="sm" onClick={() => setEditItem(_id)}>edit</Button>
                                </ListGroupItem>
                                :
                                isAuthenticated && editItemNo===_id?
                                <ListGroupItem className="item">
                                    <Button className="remove-btn" variant="danger" size="sm">&times;</Button>
                                    <input value={editedName} onChange={onChange} type="text"/>
                                    <Button className="update-btn" variant="success" onClick={updateHandler}>update</Button>
                                    <Button className="remove-btn" variant="success" onClick={() => setEditItem(0)}>&times;</Button>
                                </ListGroupItem>
                                :
                                <ListGroupItem className="item">
                                        {name}
                                </ListGroupItem>
                                }
                        </CSSTransition>
                    ))
            }
            </TransitionGroup>
        }
        </ListGroup>
        </Container>
    )
}

export default ShoppingList
