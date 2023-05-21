import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editGame, getDetails, getGames, resetDetails } from "../../redux/actions";
import loading from '../Tools/loading.gif'

export default function Details() {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [block, setBlock] = useState(false);
    const [input, setInput] = useState({ name: '', id: '' })
    const gamedetail = useSelector(state => state.details);

    useEffect(() => {
        dispatch(getDetails(params.id));
    }, [params.id, dispatch]);



    function cleanSubmit(g) {
        g.preventDefault();
        dispatch(resetDetails());
        navigate('/main')
    }

    function cleanText(text) {
        let cleanString = /[<^/>]p*/g;
        return text.replace(cleanString, '')
    }

    function show() {
        setBlock(!block)
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })        
    }

    function submitPut(e, id) {
        e.preventDefault();
        dispatch(editGame({ name: input.name, id }));            
        navigate('/main')
    }

    return (
        <div className="all_detail">
            {
                Object.keys(gamedetail).length ?
                    <div className='details_container'>
                        <div className="btn">
                            <Link to='/Main'>
                                <button onClick={(e) => cleanSubmit(e)}
                                    className='btn_main'>Return to Main Menu</button>
                            </Link>
                        </div>
                        <div className='left_details'>
                            <h2 className='name1'>NAME: {gamedetail.name.toUpperCase()}
                                {(typeof (gamedetail.id) == 'string') ?
                                    <div>
                                        <button id='showInput' onClick={() => show()}>Edit</button>
                                        <div id="inputShow" style={{ display: block ? 'block' : "none" }}>
                                            <button
                                                id='submitInput'
                                                type='submit'
                                                onClick={(e) => submitPut(e, gamedetail.id)}
                                            >Submit change</button>
                                            <input
                                                type="text"
                                                name='name'
                                                value={input.name}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                    </div> : null}
                            </h2>
                            <img className="detailimg" src={gamedetail.img} alt="game"
                                width='560px' height='290px' />
                        </div>
                        <div className="right_details">
                            <h4>Genres: {gamedetail.genres.map(t => t.name ? t.name + " " : t + ' ')}</h4>
                            <h4>Release date: {gamedetail.releaseDate}</h4>
                            <h4>Rating: {gamedetail.rating}</h4>                            
                            <h4>Platforms: {gamedetail.platforms.map(e => e + ' ')}</h4>
                            <h5 className="descript">Description: {cleanText(gamedetail.description)}</h5>

                        </div>
                    </div>
                    :
                    <div className="loading_container">
                        <img src={loading} className='loading' alt="loading please wait" />
                        <h2 className="loading_title">Loading...</h2>
                    </div>
            }


        </div>
    )

}