import React from 'react';
import '../Pagination/index.css';

export default function Pagination ({gamesPerPage, allGames, pagination}) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(allGames/gamesPerPage); i++) {
        pageNumber.push(i);
    };

    return(
            <nav>
                <ul className="paginado">
                    { pageNumber && 
                    pageNumber.map(number => (
                        <li className="li" key={number}>
                            <button className='paginas' onClick={() => pagination(number)}>{number}</button>
                        </li>
                    ))}
                </ul>
            </nav>
    );
};