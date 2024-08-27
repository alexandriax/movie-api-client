import React from 'react';
import { useState, useEffect } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';


export const SearchBar = ({ token }) => {
  const [apiMovies, setApiMovies] = useState([])
  const [loading, setLoading] = useState(true)
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
    })
    .catch(err => {
      console.log(err)
      setError(err)
  })
  .finally(() => {
    setLoading(false)
  })
  }, [token]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  
  if (apiMovies && apiMovies.length > 0) {
  const filteredItems = apiMovies.filter((movie) =>
    movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  setFilteredMovies(filteredItems);
  }
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


