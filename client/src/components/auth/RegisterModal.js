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
import {register} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';


function RegisterModal() {
  const [show, setShow] = useState(false);
  const [state,setState] = useState({
      name: '',
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
    if(error.id === 'REGISTER_FAIL'){
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
    const {name,email,password} = state;

    const newUser = {
        name,
        email,
        password
    }

    dispatch(register(newUser));
    }

  return (
    <>
      <NavLink onClick = {handleShow}>
          Register
      </NavLink>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {msg? <Alert color='danger'>{msg}</Alert> : null}
            <Form>
                <FormGroup>
                    <label for="name">Name</label>
                    <input className="mb-3" type="text" name="name" value={state.name} id="name" placeholder="name" onChange={onChange}/>

                    <br/>

                    <label for="email">Email</label>
                    <input className="mb-3" type="email" name="email" value={state.email} id="email" placeholder="Email" onChange={onChange}/>

                    <br/>

                    <label for="password">Password</label>
                    <input className="mb-3" type="password" name="password" value={state.password} id="password" placeholder="password" onChange={onChange}/>
                </FormGroup>
            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={onSubmit} variant="primary">Register</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterModal
