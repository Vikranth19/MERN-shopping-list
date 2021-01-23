import React, {useState,useEffect} from 'react'
import {
    Button,
    FormGroup,
    Modal,
    Form,
    NavLink,
    Alert
} from 'react-bootstrap'
import {useDispatch,useSelector } from 'react-redux';
import {login} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';


function Login() {
  const [show, setShow] = useState(false);
  const [state,setState] = useState({
      email: '',
      password: ''
  })
  const [msg, setMsg] = useState(null);

  const dispatch = useDispatch();

const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
const error = useSelector(state => state.error);

//--trying alternative for prevprops
// const [err,setErr] = useState(error);
// const prevErrRef = useRef();

useEffect(() => {
    //check for register error
    if(error.id === 'LOGIN_FAIL'){
        setMsg(error.msg.msg);
    }else{
        setMsg(null);
    }

    //if authenticated, close modal
    if(show){
        console.log(isAuthenticated);
        if(isAuthenticated){
            setShow(false);
        }
    }
},[error,isAuthenticated])


  const handleClose = () => {
      //clear errors
      dispatch(clearErrors());
      setShow(false);
  }
  const handleShow = () => setShow(true);

  const onChange = e => {
      setState({
          ...state,
          [e.target.name]: e.target.value
      })
  }

  const onSubmit = e =>{
    e.preventDefault();

    const {email,password} = state;

    const user = {
        email,
        password
    }
        dispatch(login(user));
    }

  return (
    <>
      <NavLink onClick = {handleShow}>
          Login
      </NavLink>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {msg? <Alert color='danger'>{msg}</Alert> : null}
            <Form>
                <FormGroup>
                    <label for="email">Email</label>
                    <input className="mb-3" type="email" name="email" value={state.email} id="email" placeholder="Email" onChange={onChange}/>

                    <br/>

                    <label for="password">Password</label>
                    <input className="mb-3" type="password" name="password" value={state.password} id="password" placeholder="password" onChange={onChange}/>
                </FormGroup>
            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={onSubmit} variant="primary">Login</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login
