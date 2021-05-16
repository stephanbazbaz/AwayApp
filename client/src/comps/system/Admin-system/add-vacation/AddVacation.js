import React from 'react'
import './style.css';
import './mediaQuery.css';
import UploadPic from '../Upload-pic/UploadPic'
import { domain } from '../../../../config'
import { useHistory } from 'react-router-dom'

export default function AddVacation({ setadminShow, image, setImage, editVacation }) {

    const [destination, setdestination] = React.useState('')
    const [description, setdescription] = React.useState('')
    const [fromDate, setfromDate] = React.useState('')
    const [tillDate, settilldate] = React.useState('')
    const [price, setprice] = React.useState('')
    let history = useHistory()

    const add = async (e) => {
        e.preventDefault()
        if (destination === '' || description === '' || fromDate === '' || tillDate === '' || price === '' || image === undefined) {
            alert('Must Fill all Fields')
            return
        }
        try {
            const res = await fetch(domain + '/addvacation', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    destination,
                    description,
                    image,
                    fromDate,
                    tillDate,
                    price
                })
            })
            const data = await res.json()
            setadminShow(data)
            setdestination('')
            setdescription('')
            setfromDate('')
            settilldate('')
            setprice('')
            history.push('/home')
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='add-vacation-warp'>
            <div className='add-v-title'>ADD VACATION</div>
            <form className='add-form'>
                <input
                    className='edit-inputs'
                    placeholder='destination'
                    value={destination}
                    onChange={(e) => { setdestination(e.target.value) }}
                    type='text'
                />
                <input
                    className='edit-inputs'
                    placeholder='description'
                    type='text'
                    value={description}
                    onChange={(e) => { setdescription(e.target.value) }}
                />
                <input
                    className='edit-inputs'
                    type='date'
                    value={fromDate}
                    onChange={(e) => { setfromDate(e.target.value) }}
                />
                <input
                    className='edit-inputs'
                    type='date'
                    value={tillDate}
                    onChange={(e) => { settilldate(e.target.value) }}
                />
                <input
                    className='edit-inputs'
                    placeholder='price'
                    value={price}
                    onChange={(e) => { setprice(e.target.value) }}
                />
                <UploadPic
                    setImage={setImage}
                    image={image}
                    editVacation={editVacation}
                />
                <button
                    className='edit-inputs edit-btn'
                    type='submit' onClick={add}>save</button>
            </form>
        </div>
    )
}
