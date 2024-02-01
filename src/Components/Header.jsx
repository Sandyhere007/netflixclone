import React from 'react';
import logo from '.././logonetflix.png';
import {ImSearch} from 'react-icons/im';
import { Link } from 'react-router-dom';
const Header = () => {
    return (

        <div className="navbar">
                <img src={logo} alt="" />
            <div className="navitems">
                <Link to={"/tvshows"} >Tv Shows</Link>
                <Link to={"/movies"} >Movies</Link>
                <Link to={"/recentlyadded"} >Recently Added</Link>
                <Link to={"/mylist"} >My List</Link>
            </div>
            <ImSearch />
        </div>
    )
}

export default Header