import React from 'react'

const Joke = ({ joke }) => {
    return (
        <div>
            <ul>
                <li>Id: {joke.id}</li>
                <li>Joke: {joke.joke}</li>
            </ul>
        </div>
    )
}

export default Joke