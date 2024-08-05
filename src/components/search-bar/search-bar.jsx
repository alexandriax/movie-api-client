import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSearchResults } from '../../redux/actions';
import { Form, Button, InputGroup } from 'react-bootstrap';

export const SearchBar = () => {
    const dispatch = useDispatch();
    const query = useSelector((state) => state.searchQuery);

    const handleSearch = (event) => {
        event.preventDefault();
        fetch(`https://moo-movies-10a7ea08abc9.herokuapp.com/movies?search=${query}`,
            {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        )
          .then((response) => response.json())
          .then((data) => {
            dispatch(setSearchResults(data));
          })
          .catch((error) => {
            console.error('error finding results:', error);
          });
    };

    return (
        <Form onSubmit={handleSearch} className='mb-4'>
            <InputGroup>
                <Form.Control
                  type='text'
                  placeholder='search for a movie'
                  value={query}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                />
                <Button variant='primary' type='submit'>
                    search
                </Button>
            </InputGroup>
        </Form>
    );
};
