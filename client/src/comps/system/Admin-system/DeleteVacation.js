import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { domain } from '../../../config'

export default function DeleteVacation({ vacationId, setadminShow, setisModalOpen }) {

    const deleteVac = async (id) => {

        var txt;
        var r = window.confirm("Are You Sure You Want To Delete This Vacation?");
        if (r == true) {
            txt = "You pressed OK!";
        } else {
            txt = "You pressed Cancel!";
        }
        if (txt == "You pressed OK!") {
            try {
                const res = await fetch(domain + `/delete-vacation/${id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id })
                    }
                )
                const data = await res.json()
                setadminShow(data)
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            setisModalOpen(false)
        }
    }
    return (
        <DeleteIcon className='icons'
            onClick={() => deleteVac(vacationId)}
        />
    )
}
