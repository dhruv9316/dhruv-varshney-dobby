import React from 'react';
import './SearchBar.css'

import { CiSearch } from "react-icons/ci";

export default function SearchBar({searchQuery, setSearchQuery}) {
    const onSearchHandler = (e) => {
        setSearchQuery(e.target.value)
    }
    return (
        <>
            <div className='main_div'>
                <div className='search_div'>
                    <button className='search_btn'>
                        <CiSearch fontSize={25} color='#74787c' />
                    </button>
                    <div className='query_div'>
                        <input
                            type='text'
                            name='search_query'
                            value={searchQuery}
                            onChange={onSearchHandler}
                            placeholder='Search Image by its name'
                        />
                    </div>
                </div>
            </div>
        </>
    );
}