import { useEffect, useState } from "react";
import Typeahead from "../Typeahead/Typeahead";

function UserSearch() {
    const [searchValue, setSearchValue] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if(searchValue === ''){
            setOptions([])
            return;
        }

        fetch(`https://api.github.com/search/users?page=1&per_page=10&q=${searchValue}`, {
            headers : {
                Authorization: 'token ' + process.env.REACT_APP_ACCESS_TOKEN 
            }
        })
        .then(res => res.json())
        .then(res => {
            setOptions(res.items)
        });
    },[searchValue]);


    const inputChangeHandler = (value) => {
        setSearchValue(value)
    }
    
    return (
        <div>
            <Typeahead value={searchValue} options={options}  onChange={inputChangeHandler}/>
        </div>
    );
}

export default UserSearch;