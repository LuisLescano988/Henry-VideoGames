import React from "react";
import { Link } from "react-router-dom";

export default function Cards({ id, name, img, genres }) {   
    
    return (
        <div className="all_cards">
            <div className="cards">
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