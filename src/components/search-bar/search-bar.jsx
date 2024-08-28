import React from 'react';
import { useState, useEffect } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Proptypes from 'prop-types';


export const SearchBar = ({ token, onMoviesFiltered }) => {
  const [apiMovies, setApiMovies] = useState([])
  const [error, setError] = useState(null)
  const [searchItem, setSearchItem] = useState('')
  const [filteredMovies, setFilteredMovies] = useState([])

  useEffect(() => {
    if(!token) return;

    fetch('https://moo-movies-10a7ea08abc9.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
      setApiMovies(data)
      setFilteredMovies(data)
      onMoviesFiltered(data)
    })
    .catch(err => {
      console.log(err)
      setError(err)
  })

  }, [token]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  
  const filteredItems = apiMovies.filter((movie) =>
    movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  setFilteredMovies(filteredItems);
  onMoviesFiltered(filteredItems);
  
  };



  return (
    <Form className="d-flex">
      <FormControl
        type='text'
        placeholder='search movies'
        className='mr-sm-2'
        value={searchItem}
        onChange={handleInputChange}
        />
        <Button variant='primary' type='submit'>search</Button>
      
    </Form>
  );
};

SearchBar.propTypes = {
  token: Proptypes.string.isRequired,
  onMoviesFiltered:Proptypes.func.isRequired
};


