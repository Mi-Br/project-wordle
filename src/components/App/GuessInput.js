
import {LEN_OF_WORDS} from '../../constants'
import React from 'react'

const GuessInput = ({onWordSubmit})=>{
    const [input, setInput] = React.useState('')



    function handleSubmit (event)  {
        event.preventDefault();
        if(input.length === LEN_OF_WORDS){
            onWordSubmit(input);
            setInput('');
        }
    }

    function handleInputChange(event){
        const val = event.target.value
        if(/^[a-zA-Z]+$/.test(val)|| val ==='') {
            setInput(val.toUpperCase());
        }
    }

    return (
    <form class="guess-input-wrapper" onSubmit={handleSubmit}>
        <label for="guess-input">Enter guess:</label>
        <input maxLength = {LEN_OF_WORDS} id="guess-input" type="text" value={input} onChange={handleInputChange}/>
      </form>
    )
}

export default GuessInput;
