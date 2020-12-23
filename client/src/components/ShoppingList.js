import React,{useEffect} from 'react'
import {Container, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import {getItems, deleteItem} from '../actions/itemActions';


function ShoppingList() {
    // const [items, setItems] = useState([]);
    // console.log(items);

    const items = useSelector(state => state.item.items)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItems());
    }, [dispatch])

    const onDeleteClick = (id) => {
        dispatch(deleteItem(id));
    }

    return (
        <Container>
        <ListGroup>
            <TransitionGroup className="shopping-list">
                {
                    items.map(({_id,name}) =>(
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                <Button 
                                    className="remove-btn" 
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDeleteClick(_id)}
                                >&times;</Button>
                                {name}
                            </ListGroupItem>
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </ListGroup>
        </Container>
    )
}

export default ShoppingList
