import React from 'react'
import './style.css';
import AdminNavBar from '../Admin-system/Admin-nav/AdminNavBar'
import { domain } from '../../../config'

export default function AdminPage({ setadmin }) {
    const [allVacations, setallVacations] = React.useState([])
    const [adminShow, setadminShow] = React.useState([])
    const user = JSON.parse(localStorage.getItem('admin'))
    const [isModalOpen, setisModalOpen] = React.useState(false);
    const [editVacation, seteditVacation] = React.useState({})

    React.useEffect(async () => {
        try {
            const res = await fetch(domain + '/adminvacations')
            const data = await res.json()
            console.log(data);
            setallVacations(data)
        }
        catch (err) {
            console.log(err);
        }
    }, [adminShow])

    return (
        <div className='container_row'>
            <AdminNavBar
                seteditVacation={seteditVacation}
                editVacation={editVacation}
                setadmin={setadmin}
                isModalOpen={isModalOpen}
                setisModalOpen={setisModalOpen}
                setadminShow={setadminShow}
                allVacations={allVacations}
            />
        </div>
    )
}
