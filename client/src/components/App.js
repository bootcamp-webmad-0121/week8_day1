import { Component } from 'react'
import './App.css'

import Routes from './routes/Routes'
import Footer from './layout/Footer/Footer'
import Navigation from './layout/Navigation/Navigation'
import AuthService from '../service/auth.service'
import Alert from './shared/Alert/Alert'



class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedUser: undefined,
      alert: {
        show: false,
        title: '',
        text: ''
      }
    }
    this.authService = new AuthService()
  }

  storeUser(loggedUser) {
    this.setState({ loggedUser }, () => console.log('Usuario modificado:', this.state.loggedUser))
  }

  fetchUser() {
    this.authService
      .isLoggedIn()
      .then(response => this.storeUser(response.data))
      .catch(() => this.storeUser(undefined))
  }

  componentDidMount() {
    this.fetchUser()
  }

  handleAlert = (show, title, text) => this.setState({alert: { show, title, text }})

  render() {
    return (
      <>
        <Navigation storeUser={user => this.storeUser(user)} loggedUser={this.state.loggedUser} handleAlert={this.handleAlert}/>
        <main>
          <Routes storeUser={user => this.storeUser(user)} loggedUser={this.state.loggedUser} handleAlert={this.handleAlert}/>
        </main>
        <Footer />
        <Alert handleAlert={this.handleAlert} show={this.state.alert.show} title={this.state.alert.title} text={this.state.alert.text}/>
      </>
    )
  }
}

export default App