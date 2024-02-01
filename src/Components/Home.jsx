import axios from "axios"
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai"
import { BiPlay } from "react-icons/bi"
const apikey = "9b64248ea17a7e59333ab3abeceb1235";
const url = "https://api.themoviedb.org/3/movie";
const imgurl = "https://image.tmdb.org/t/p/w500/"
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img,title }) => (
<div  className='card'>
<img src={img} alt="cover" />
  <h3>{title}</h3>
</div>

);


const Row = ({ title, arr = [] }) => {
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div>
        {arr.map((item, index) =>
        (
          <Card key={index} img={`${imgurl}/${item.poster_path}`} title={item.original_title} />
        ))}

      </div>
    </div>
  )
};


const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  useEffect(() => {
    const fetchUpcoming = async () => {
      const { data: { results }, } = await axios
        .get(`${url}/${upcoming}?api_key=${apikey}`);
      console.log(results)
      setUpcomingMovies(results);
    };
    const fetchNowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/${nowPlaying}?api_key=${apikey}`)
      setNowPlayingMovies(results);
    }
    const fetchPopular = async () => {
      const { data: { results } } = await axios.get(`${url}/${popular}?api_key=${apikey}`)
      setPopularMovies(results);
    }
    const fetchTopRated = async () => {
      const { data: { results } } = await axios.get(`${url}/${topRated}?api_key=${apikey}`)
      setTopRatedMovies(results);
    }
    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
  }, [])
  return (
    <div className='home'>
      <div className="banner" style={{
        backgroundImage: popularMovies[0]
          ? `url(${`${imgurl}/${popularMovies[0].poster_path}`})`
          : "rgb(16,16,16)"
      }}>
        <div className="container">
          {popularMovies[0] && <h2>{`${popularMovies[0].original_title}`}</h2>}

          {popularMovies[0] && <p>{`${popularMovies[0].overview}`}</p>}
          <div>
            <button><BiPlay /> Play </button>
            <button>Watch Later <AiOutlinePlus /></button>
          </div>
        </div>
      </div>
      <Row title={"Upcoming"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular Movies"} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />
    </div>
  )
};

export default Home