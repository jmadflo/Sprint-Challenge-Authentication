import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const LoginForm = props => {
    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    })

    const history = useHistory()

    const updateForm = event => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })
    }

    const formSubmit = event => {
        event.preventDefault()
        axios.create({ headers: {'Content-Type': 'application/json'} })
            .post('http://localhost:3300/api/auth/login', {
                username: formValues.username, 
                password: formValues.password
            })
            .then(response => {
                console.log(response)
                props.setToken(response.data.token)
                axios.create({ headers: {'Authorization': response.data.token} })
                    .get('http://localhost:3300/api/jokes')
                    .then(response => {
                        console.log(response.data)
                        props.setDataToRender(response.data)
                        history.push('/jokes')
                    })
            })
            .catch(error => alert(error))
    }
    return (
        <form>
            <h2>Login Form</h2>
            <input name='username' type='text' placeholder='username' value={formValues.username} onChange={updateForm} />
            <input name='password' type='password' placeholder='password' value={formValues.password} onChange={updateForm} />
            <button onClick={formSubmit}>Login</button>
        </form>
    )
}

export default LoginForm