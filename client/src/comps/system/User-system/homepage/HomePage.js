import React from 'react'
import Search from '../search/Search'
import './style.css';
import './query.css';

import UserVacationCard from '../vacation-card/UserVacationCard'

export default function HomePage({ allVacations, setshow, setallVacations, searchVac, setsearchVac }) {
    setshow(searchVac)
    return (
        <div className='main slide-right'>
            <Search
                setshow={setshow}
                setsearchVac={setsearchVac}
                searchVac={searchVac}
                setallVacations={setallVacations}
            />
            <UserVacationCard
                setshow={setshow}
                allVacations={allVacations}
            />
        </div>
    )
}
