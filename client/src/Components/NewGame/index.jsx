import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenres, getPlatforms, postGame } from '../../redux/actions';
import './index.css';


const validRating = (num) => {
    if (num.match(
        /^[+]?(\d*\.[0-9]+|[0-5])$/
        // /^?(\d[0-5]{1}*[.])?[0-9]{2}+/
    ) && num !== '') {
        return true;
    } else {
        return false;
    }
};

export default function CreateGame() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const existingGames = useSelector(state => state.videogames);
    const platforms = useSelector((state) => state.platforms)
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [active, setActive] = useState(false)
    
    const [input, setInput] = useState({
        name: '',
        description: '',
        releaseDate: '',
        rating: '',
        platforms: [],
        genres: []
    });
    
    useEffect(() => {
        dispatch(getGenres())
        dispatch(getGames())
    }, [dispatch])

    useEffect(() => {
        dispatch(getPlatforms())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e) {
        setInput({
            ...input,
            genres: input.genres.includes(e.target.value) ?
                [...input.genres] :
                [...input.genres, e.target.value]
        })
        setErrors(validate({
            ...input,
            genres: [...input.genres, e.target.value]
        }))
    }

    function handleSelect2(e) {
        setInput({
            ...input,
            platforms: input.platforms.includes(e.target.value) ?
                [...input.platforms] :
                [...input.platforms, e.target.value]
        })
        setErrors(validate({
            ...input,
            platforms: [...input.platforms, e.target.value]
        }))
    }

    function handleDelete(e) {
        setInput({
            ...input,
            genres: input.genres.filter(t => t !== e)
        })
    }

    function handleDelete2(e) {
        setInput({
            ...input,
            platforms: input.platforms.filter(t => t !== e)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.name) {
            return alert("*Name is required ")
        }
        else if (typeof input.name !== 'string' || input.name.length < 3) {
            return alert('*The name must contain 3 or more letters')
        }
        else if (existingGames.find((p) => p.name.toLowerCase() === input.name.toLowerCase())) {
            return alert(`*Videogame named -${input.name}- already exists`)
        }
        else if (!input.description) {
            return alert("*Description is required")
        }
        else if (typeof input.description !== 'string') {
            return alert('*Description must be a text, not numbers')
        }
        else if (input.description.length < 15) {
            return alert('*Description too short')
        }
        else if (!input.releaseDate) {
            return alert("*Release date is required")
        }
        else if (!input.rating) {
            return alert("*Rating is required")
        }
        else if (input.rating.length > 4) {
            return alert("*Rating only admit 2 decimals")
        }
        else if (!validRating(input.rating)) {
            return alert("Rating must be a float number between 0 and 5")
        }
        else if (!input.genres[0]) {
            return alert("At least one Genre is required")
        }
        else if (!input.platforms[0]) {
            return alert("At least one Platform is required");
        }

        dispatch(postGame(input))        
        navigate('/main')
        dispatch(getGames())
        setInput({
            name: '',
            description: '',
            releaseDate: '',
            rating: '',
            platforms: [],
            genres: []
        })
    }

    function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = "*Insert Name";
        }
        else if (typeof input.name !== 'string' ||
            input.name.length < 1 ||
            input.name.length > 15 ||
            input.name.includes("1") ||
            input.name.includes("2") ||
            input.name.includes("3") ||
            input.name.includes("4") ||
            input.name.includes("5") ||
            input.name.includes("6") ||
            input.name.includes("7") ||
            input.name.includes("8") ||
            input.name.includes("9") ||
            input.name.includes("0")) {
            errors.name = '*Write without numers or blank space';
        }
        else if (existingGames.find((p) => p.name.toLowerCase() === input.name.toLowerCase())) {
            errors.name = `*Videogame named -${input.name}- already exists`;
        }
        else if (!input.description) {
            errors.description = "*Description is required"
        }
        else if (typeof input.description !== 'string') {
            errors.description = '*Description must be a text, not numbers'
        }
        else if (input.description.length < 15) {
            errors.description = '*Description too short'
        }
        else if (!input.releaseDate) {
            errors.releaseDate = "*Release date is required"
        }
        else if (!input.rating) {
            errors.rating = "*Rating is required"
        }
        else if (input.rating.length > 4) {
            errors.rating = "*Rating only admit 2 decimals"
        }
        else if (!validRating(input.rating)) {
            errors.rating = "Rating must be a float number between 0 and 5"
        }
        else if (!input.genres[0]) {
            errors.genres = "At least one Genre is required"
        }
        else if (!input.platforms[0]) {
            errors.platforms = "At least one Platform is required"
        }
        else if (!errors.name) {
            setActive(true)
        }

        return errors;

    };

    return (
        <div className='container_all'>
            <form className='form_post' onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <h3>Post your videogame info</h3>
                    <div>
                        <div>
                            <label>Name: </label><br />
                            <input
                                type="text"
                                value={input.name} name='name'
                                onChange={(e) => handleChange(e)} className='input_form' />
                            {
                                errors.name && (
                                    <p className='error'>{errors.name}</p>
                                )
                            }
                        </div>
                        <div>
                            <div>
                                <label>Description: </label><br />
                                <input
                                    type="text"
                                    value={input.description}
                                    name='description'
                                    onChange={(e) => handleChange(e)} className='input_form' />
                                {
                                    errors.description && (
                                        <p className='error'>{errors.description}</p>
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <label>Release Date: </label><br />
                            <input type="date" value={input.releaseDate} name='releaseDate' onChange={(e) => handleChange(e)} className='input_form' />
                            {
                                errors.releaseDate && (
                                    <p className='error'>{errors.releaseDate}</p>                                    
                                    )
                                }
                        </div>
                        <div>
                            <label>Rating: </label><br />
                            <input type="number" value={input.rating} name='rating' onChange={(e) => handleChange(e)} className='input_form' />
                            {
                                errors.rating && (
                                    <p className='error'>{errors.rating}</p>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='platforms'>
                        <Link to="/main" className='btn_home'>
                            Main menu
                        </Link>
                        <br /><br />
                    <div>
                        <label>Platform: </label><br />
                        <select name="platforms" onChange={(e) => handleSelect2(e)}>
                            {
                                platforms.map((t) => (
                                    <option value={t} key={t} >{t}</option>
                                ))
                            }
                        </select>

                        {input.platforms.map(t =>
                            <div className="list_types" key={t}>
                                <p className='type'>- {t}</p>
                                <button className='btn_x' value={t} onClick={() => handleDelete2(t)}>x</button>
                            </div>
                        )}
                    </div>
                    <div className='type_container'>
                        <label>Genres: </label><br />
                        <select name='genres' onChange={(e) => handleSelect(e)}>
                            {
                                genres.map((t) => (
                                    <option value={t.name} key={t.id}>{t.name}</option>
                                ))
                            }
                        </select>

                        {input.genres.map(t =>
                            <div className="list_types" key={t}>
                                <p className='type'>- {t}</p>
                                <button className='btn_x' value={t} onClick={() => handleDelete(t)}>x</button>
                            </div>
                        )}

                    </div>
                    <button type='submit' className='btn_create' disabled={!active}>Click here to post</button>
                </div>
            </form>
        </div>
    )

}

