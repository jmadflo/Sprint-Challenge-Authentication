import React, { useEffect } from 'react'
import axios from 'axios'
import Joke from './Joke'

const JokesList = props => {
    return (
        <div className='JokesList'>
            {props.dataToRender.map(joke => {
                return <Joke key={joke.id} joke={joke} />
            })}
        </div>
    )
}

export default JokesList