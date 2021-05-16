import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import UploadPic from '../Upload-pic/UploadPic'
import { domain } from '../../../../config'
import './style.css';
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function EditModal({ setisModalOpen, isModalOpen, editVacation, setadminShow, setImage, image, seteditVacation }) {
    const [destination, setdestination] = React.useState(editVacation.destination)
    const [description, setdescription] = React.useState(editVacation.description)
    const [fromDate, setfromDate] = React.useState(editVacation.from_date)
    const [tillDate, settilldate] = React.useState(editVacation.till_date)
    const [price, setprice] = React.useState(editVacation.price)


    const handleClose = () => {
        setisModalOpen(false)
        seteditVacation('')
    }

    const update = async (e) => {
        e.preventDefault()
        if (destination === '' || description === '' || fromDate === '' || tillDate === '' || price === '') {
            alert('Must Fill all Fields')
            return
        }
        try {
            const res = await fetch(domain + '/updatevacation', {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: editVacation.id,
                    destination,
                    description,
                    image,
                    fromDate,
                    tillDate,
                    price
                })
            })
            const data = await res.json()
            console.log(data);
            setadminShow(data)
            setisModalOpen(false)
        }
        catch (err) {
            console.log(err);
        }
    }

    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isModalOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade
                    in={isModalOpen}>
                    <div className={classes.paper}>
                        <div onClick={handleClose} className='x-icon'>X</div>
                        <div className='edit-title'>{editVacation.destination}</div>
                        <div className='edit-title'>{editVacation.description}</div>
                        <form className='editModalWarp'>
                            <input
                                className='edit-inputs'
                                value={destination}
                                onChange={(e) => { setdestination(e.target.value) }}
                            />
                            <input
                                className='edit-inputs'
                                value={description}
                                onChange={(e) => { setdescription(e.target.value) }}
                            />
                            <UploadPic
                                setImage={setImage}
                                image={image}
                                editVacation={editVacation}
                            />
                            <input
                                className='edit-inputs'
                                value={fromDate}
                                onChange={(e) => { setfromDate(e.target.value) }}
                                type='date'
                            />
                            <input
                                className='edit-inputs'
                                value={tillDate}
                                onChange={(e) => { settilldate(e.target.value) }}
                                type='date'
                            />
                            <input
                                className='edit-inputs'
                                value={price}
                                onChange={(e) => { setprice(e.target.value) }}
                            />
                            <button
                                className='edit-inputs edit-btn'
                                type='submit' onClick={update}>SAVE</button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
