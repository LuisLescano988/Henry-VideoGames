import React from 'react';
import './index.css';
import loading from '../Tools/loading.gif'
import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenres, resetDetails, filterBySource, sortByName, sortByRating, filterByGenres, deleteGame } from '../../redux/actions/index';
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineMail,
} from "react-icons/ai"

import { Link, useNavigate } from 'react-router-dom';
//ME IMPORTO EL COMPONENTE Card y renderizo en linea 
import Cards from '../Cards/index';
import SearchBar from '../Searchbar/index'
import Pagination from '../Pagination/index';

export default function Main() {
  const dispatch = useDispatch();
  const allGames = useSelector(state => state.videogames);
  const [, setOrder] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(true)

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);
  const pagination = (pageNumber) => setCurrentPage(pageNumber);
  const allDbGames = allGames.filter(g => g.dbCreated)

  const gams = useSelector(state => state.videogames)

  useEffect(() => {
    // dispatch(resetDetails());
    !gams.length && dispatch(getGames());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1)
  }, [allGames]);

  const genres = useSelector((state) => state.genres);
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);


  function handleClick(e) {
    e.preventDefault();
    dispatch(getGames());
  }

  function handleAlert(e) {
    e.preventDefault();
    allDbGames.length < 2 ?
      navigate("/videogames") :
      alert("cannot post game database is full") && (navigate("/main"))
  }

  function handleFilterBySource(e) {
    dispatch(filterBySource(e.target.value))
  }

  function handleFilterByGenres(e) {
    e.preventDefault();
    dispatch(filterByGenres(e.target.value));
  }

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`)
  }


  function handleSortByRating(e) {
    e.preventDefault();
    dispatch(sortByRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }


  return (
    <div className='all'>
      <div className='top_nav'>
        <div className='filters'
          onMouseLeave={() => setOpen(true)}>
          <div className='hambur'>
            <button className='hambur_button' onMouseEnter={() => setOpen(false)} >
              {open ?
                "Filters ▼"
                :
                "X"
              }
            </button>
          </div>
          <div style={{
            visibility: !open ? "visible" : "hidden",
            margin: "1% 0% 0% 0%",
          }}>
            <select onChange={(e) => handleFilterBySource(e)} defaultValue='Filter By Source'>
              <option disabled>Filter By Source</option>
              <option value="All">All</option>
              <option value="Api">Api</option>
              <option value="Created">Created</option>
            </select>
            <select onChange={(e) => handleFilterByGenres(e)} defaultValue='Filter By Genre'>
              <option disabled>Filter By Genre</option>
              <option value="All">All Genres</option>
              {genres.map((genres) => (
                <option value={genres.name} key={genres.id}>
                  {genres.name}
                </option>
              ))}
            </select>
            <select onChange={e => handleSortByName(e)} defaultValue='Sort By Name'>
              <option disabled>Sort By Name</option>
              <option value="asc">From A to Z</option>
              <option value="desc">From Z to A</option>
            </select>
            <select onChange={e => handleSortByRating(e)} defaultValue='Sort By Rating'>
              <option disabled>Sort By Rating</option>
              <option value="lower-rating">Lower Rating</option>
              <option value="higher-rating">Higher Rating</option>
            </select>
          </div>
        </div>
        <div className='nav_and_new_game'>
          <button className="btn_reload" onClick={(e) => { handleAlert(e) }}>
            Post new game info
          </button>
          <button className="btn_reload" onClick={(e) => { handleClick(e) }}>Reload Videogames!</button>
          <SearchBar />
        </div>
      </div>

      <h1 className='web_title'>GGG Gaming Info LOGO</h1>

      <div className='dad_container'>
        <div className='container'>
          {currentGames.length > 0 ? currentGames.map((g) => {
            return (
              <Cards
                key={g.id}
                id={g.id}
                name={g.name}
                img={g.img ? g.img : g.img}
                genres={g.genres}
                platforms={g.platforms}
                dbCreated={g.dbCreated}
              />
            );
          }) :
            <div className="loading_container">
              <img src={loading} className='loading' alt="loading please wait" />
              <h2 className="loading_title">Loading...</h2>
            </div>
          }
        </div>
      </div>
      <nav className='paginationhome'>
        <Pagination
          gamesPerPage={gamesPerPage}
          allGames={allGames.length}
          pagination={pagination}
        />
      </nav>
      <footer className='footer_connect'>
        <hr ></hr>
        <div >
          <div >
            © 2023 Luigi Dev<a href="/" ></a>
          </div>
          <div  >
            <a href="https://github.com/Luislescano988" rel="noreferrer" target="_blank">
              <AiOutlineGithub
                size={30}
                color='rgb(35,35,35)'
              />
            </a>
            <a
              href="https://www.linkedin.com/in/luis-lescano/"
              rel="noreferrer"
              target="_blank"
            >
              <AiOutlineLinkedin
                size={30}
                color='rgb(35,35,35)'
              />
            </a>
            <a
              href="mailto:largelescano@gmail.com"
              rel="noreferrer"
              target="_blank"
            >
              <AiOutlineMail
                size={30}
                color='rgb(35,35,35)'
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
