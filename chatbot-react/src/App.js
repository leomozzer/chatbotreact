import React, { Component } from 'react';

import './App.css';


import Footer from './componets/Footer';

import Home from './componets/Home';
import Chatbot from './componets/Chatbot';
import Header from './componets/Header';

import store from './store'
import { Provider } from 'react-redux';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="conteudo">
          <Header/>

          <Home/>

          <Chatbot/>
          
          <Footer/>
        </div>
      </Provider>
    );
  }
}

export default App;
