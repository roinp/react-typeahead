import '../Typeahead/Typeahead.css'
import { useMemo, useRef, useState } from 'react';

function Typeahead ({type = 'search', options, onChange}){
    const [value, setValue] = useState('')
    const timeout = useRef()
    const suggestedOpiton = useMemo(()=> {
        const option = options.find(option => option.login.startsWith(value) && option.login !== value);
        if(option) {
            return option.login;
        }

        return '';
    }, [value, options])

    const changeHandler = (e)=> {
        clearTimeout(timeout.current)
        setValue(e.target.value)
        timeout.current = setTimeout(()=> {
            onChange(e.target.value)
        },300)
    }

    const clickHandler = (e)=> {
        if (e.keyCode === 9) {
            e.preventDefault()
            onChange(suggestedOpiton);
            setValue(suggestedOpiton)
        }
    }

    return (
        <div>
            <div className='typeahead-inputs'>
                <input type={type} value={value} onChange={changeHandler} placeholder = 'Search' className="typeahead-input" onKeyDown={(e)=>clickHandler(e)}/>
                <input type={type} value={value !== '' ? suggestedOpiton :''}  className='absolute'/>
            </div>
            <div className='users-list'>
                <ul>
                    {  
                        options ?
                        (options.map(user => {
                            return (
                                <li key={user.id} className="flex">
                                    <div className='user-name'>
                                        <a target='_blank' rel="noreferrer" href={user.html_url}>
                                            <p>{user.login}</p>
                                        </a>
                                    </div>
                                    <div className='image'>
                                        <img src={user.avatar_url} alt='avatar' />
                                    </div>
                                </li>
                            )
                        })) : null
                    }
                </ul>
            </div>   
        </div>
        
    )
}

export default Typeahead