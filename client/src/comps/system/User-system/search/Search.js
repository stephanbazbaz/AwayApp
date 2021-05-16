import React from 'react'
import './style.css';
import './query.css';
import { domain } from '../../../../config'
import "react-datepicker/dist/react-datepicker.css";
export default function Search({ setallVacations, searchVac, setsearchVac }) {

    const user = JSON.parse(localStorage.getItem('user'))
    const handleChange = (e, i) => {
        const data = [...searchVac]
        data[i][e.target.name] = e.target.value;
        setsearchVac(data)
        console.log(data[0].destination);
    }
    const searchVacation = async () => {
        try {
            const res = await fetch(domain + '/search', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ searchVac, user })
            })
            const data = await res.json()
            setallVacations(data)
        }
        catch (err) {
            console.log(err);
        }
    }
    const clearInputs = () => {
        setsearchVac([{
            destination: '',
            from: '',
            till: ''
        }])
    }
    return (
        <div className='search-warp cropped'>
            {searchVac.map((item, index) => {
                return (
                    <div key={index} className='search-form'>
                        <input
                            value={item.destination}
                            name='destination'
                            onChange={(e) => { handleChange(e, index) }}
                            className='search'
                            placeholder='Search Destination'
                            type="text"
                        />
                        <input
                            className='date-input'
                            name='from'
                            value={item.from}
                            onChange={(e) => { handleChange(e, index) }}
                            type='date'
                        />
                        <input
                            className='date-input'
                            name='till'
                            value={item.till}
                            onChange={(e) => { handleChange(e, index) }}
                            type='date'
                        />
                        <button
                            className='search-btn'
                            onClick={searchVacation}>Search</button>
                        <button
                            className='search-btn clear'
                            onClick={clearInputs}>Clear</button>
                    </div>
                )
            })}
        </div>
    )
}
