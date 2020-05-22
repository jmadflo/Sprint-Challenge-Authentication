import React, { useState } from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import JokesList from './components/JokesList'
import './App.css'

function App() {
  const [token, setToken] = useState('')
  const [dataToRender, setDataToRender] = useState([])

  return (
    <div className="App">
      <nav>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
        <Link to='/jokes'>Jokes</Link>
      </nav>


      <Switch>
        
        <Route exact path='/jokes'>
          <JokesList token={token} dataToRender={dataToRender} setDataToRender={setDataToRender}/>
        </Route>
        
        <Route exact path='/register'>
          <RegisterForm setDataToRender={setDataToRender} setToken={setToken}/>
        </Route>
        
        <Route exact path='/login'>
          <LoginForm setDataToRender={setDataToRender} setToken={setToken}/>
        </Route>
        {/* reroute to register page */}
        <Route exact path='/'>
          <Redirect to='/register' />
        </Route>
      </Switch>
    </div>
  )
}

export default App
