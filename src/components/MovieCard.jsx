import React from 'react'

const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language } }) => {
  return (
    <div className='movie-card'>
        <h4>{title}</h4>
        <p>Rating: {vote_average}</p>
        <p>Release Date: {release_date}</p>
        <p>Language: {original_language}</p>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
    </div>
  )
}

export default MovieCard