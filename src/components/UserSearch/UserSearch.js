import { useEffect, useState } from "react";

function UserSearch() {
    const [searchValue, setSearchValue] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if(searchValue === ''){
            return;
        }

        fetch(`https://api.github.com/search/users?page=1&per_page=10&q=${searchValue}`, {
            headers : {
                Authorization: 'token ' + process.env.REACT_APP_ACCESS_TOKEN 
            }
        })
        .then(res => res.json())
        .then(res => setOptions(res));
    },[searchValue]);
    
    return (
        <div></div>
    );
}

export default UserSearch;