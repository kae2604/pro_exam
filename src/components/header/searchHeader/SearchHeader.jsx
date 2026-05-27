import React, {useEffect, useRef} from 'react';
import "./searchHeader.scss"
import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import searchHeaderIcon from "@assets/pictures/header/searchHeaderIcon.svg";
import searchHeaderIconMobile from "@assets/pictures/header/searchHeaderIconMobile.svg";
import {setSearchQuery} from '@store/slices/categoryFiltersSlice';


const SearchHeader = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        if (searchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [searchOpen]);

    const handleInput = (event) => {
        setInputValue(event.target.value);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        if (inputValue.trim()){
            dispatch(setSearchQuery(inputValue.trim().toLowerCase()));
            navigate("category");
            setInputValue("");
            if (searchOpen){
                handleSearchToggle()
            }
        }
    }

    const handleSearchToggle = () => {
        setSearchOpen(!searchOpen);
    };

    return (
        <div className="searchHeader_wrapper">

            <button className="searchHeaderMobile_trigger"
                    onClick={handleSearchToggle}>
                <img src={searchHeaderIconMobile} alt="searchIcon"/>
            </button>

            <form className="searchHeader_form searchHeader_form_desktop"
                  onSubmit={handleSearch}>
                <button className="searchHeader_button" type="submit">
                    <img src={searchHeaderIcon} alt="searchIcon"/>
                </button>
                <input type="text"
                       className="searchHeader_input"
                       value={inputValue}
                       onChange={handleInput}
                       placeholder="Search..." />
            </form>

            {searchOpen && (
            <div className="search_overlay"
                 onClick={handleSearchToggle}>
                <div className="search_modal"
                     onClick={e => e.stopPropagation()}>

                    <form className={`searchHeader_form searchHeader_form_mobile ${searchOpen ? 'active' : ''}`}
                                onSubmit={handleSearch}>

                        <button className="searchHeader_button"
                                type="submit">
                            <img src={searchHeaderIcon} alt="searchIcon"/>
                        </button>
                        <input
                            ref={inputRef}
                            type="text"
                            className="searchHeader_input"
                            placeholder="Search for products..."
                            value={inputValue}
                            onChange={handleInput}
                        />
                    </form>
                </div>
            </div>
            )}
        </div>
    );
};
export default SearchHeader;