import React from 'react'
import {logout} from '../../actions/authActions';
import {useDispatch,useSelector } from 'react-redux';
import {NavLink} from 'react-bootstrap';


function Logout() {
    const dispatch = useDispatch();
    const logoutHandler = () =>{
        dispatch(logout())
    }
    return (
        <>
            <NavLink onClick={logoutHandler}>Logout</NavLink>
        </>
    )
}

export default Logout
