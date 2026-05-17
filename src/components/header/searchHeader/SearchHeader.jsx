import React from 'react';
import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import "./searchHeader.scss"
import searchHeaderIcon from "@assets/header/searchHeaderIcon.svg";
import {setSearchQuery} from '@store/slices/categoryFiltersSlice';


const SearchHeader = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');

    const handleInput = (event) => {
        setInputValue(event.target.value);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        if (inputValue.trim()){
            dispatch(setSearchQuery(inputValue.trim().toLowerCase()));
            navigate("category");
            setInputValue("")
        }
    }

    return (
        <form className="searchHeader_form"
              onSubmit={handleSearch}>
            <button className="searchHeader_button"
                    type="submit">
                <img src={searchHeaderIcon} alt="searchIcon"/>
            </button>
            <input
                type="text"
                className="searchHeader_input"
                placeholder="Search for products..."
                value={inputValue}
                onChange={handleInput}
            />
        </form>
    );
};

export default SearchHeader;