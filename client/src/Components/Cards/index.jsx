import React from "react";
import { Link } from "react-router-dom";
import { deleteGame, getGames } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Cards({ id, name, img, genres, dbCreated }) {
    const dispatch = useDispatch();
    const allGames = useSelector(state => state.videogames);
    // const dbGames = allGames.filter(game => game.dbCreated);

    function gameDelete(e) {
        e.preventDefault();
        dispatch(deleteGame({ id }));
        alert('Game deleted successfully')
        dispatch(getGames())
    }

    return (
        <div className="all_cards">
            <div className="cards">
                <div className="delete_button">{
                    dbCreated?
                    <button className="delete_real" onClick={(e) => { gameDelete(e) }}>x</button>:
                    <></>
                }                  
                </div>
                <div className="container">
                    <img className="image" src={img} alt='img not found' width='350px' height='230px' />
                    <h1 className="title">{name}</h1>
                    <h3 className="genres">Genres: {genres.map(g => g.name ? g.name + ' ' : g + ' ')}</h3>
                    <Link className="info" to={`/videogames/${id}`}>More info...</Link>
                </div>
            </div>
        </div>
    )
}