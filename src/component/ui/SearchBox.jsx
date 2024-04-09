import React, { useState } from 'react';

function SearchBox({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={handleChange}
            />
            <button type="submit">검색</button>
        </form>
    );
}

export default SearchBox;