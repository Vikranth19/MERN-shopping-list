import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';

import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/authActions';

import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'react-bootstrap';
import './App.css';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])  

  return (
    <Provider store={store}>
    <div className="App">
       <AppNavbar/>
       <Container>
          <ItemModal/>
          <ShoppingList/>
        </Container>
    </div>
    </Provider>
  );
}

export default App;
