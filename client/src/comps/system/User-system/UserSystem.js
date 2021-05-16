import React from 'react'
import Navbar from './navbar/Navbar'
import { domain } from '../../../config'
export default function UserSystem({ setToken }) {

    const [allVacations, setallVacations] = React.useState([])
    const [show, setshow] = React.useState()
    const user = JSON.parse(localStorage.getItem('user'))
    const [searchVac, setsearchVac] = React.useState([{
        destination: '',
        from: '',
        till: ''
    }])
    React.useEffect(async () => {
        try {
            const res = await fetch(domain + `/allvacations/${user.id}`)
            const data = await res.json()
            const resSearch = await fetch(domain + '/search', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ searchVac, user })
            })
            const dataSearch = await resSearch.json()
            setallVacations(dataSearch)
        }
        catch (err) {
            console.log(err);
        }
    }, [show])
    return (
        <div className='container_row'>
            <Navbar
                setsearchVac={setsearchVac}
                searchVac={searchVac}
                show={show}
                setallVacations={setallVacations}
                setshow={setshow}
                allVacations={allVacations}
                setToken={setToken}
            />
        </div>
    )
}
