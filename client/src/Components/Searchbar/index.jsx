import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogameByName } from '../../redux/actions/index';

export default function SearchBar() {
    // aca usamos Hook
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handInputChange(g) {
        g.preventDefault();
        setName(g.target.value);
    }

    function handleSubmit(g) {
        g.preventDefault();
        if (name.length > 0) {
            dispatch(getVideogameByName(name));
            setName('');
            g.target.reset()
        } else {
            alert('type the name of any game!')
        }
    }


    return (
        <div>
            <form onSubmit={(g) => handleSubmit(g)}>
                <input
                    type='text'
                    placeholder="Buscar Juego..."
                    onChange={(g) => handInputChange(g)} />
                <button type='submit'>Buscar</button>
            </form>
        </div>
    )


}