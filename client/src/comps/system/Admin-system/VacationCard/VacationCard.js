import React from 'react';
import './style.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteVacation from '.././DeleteVacation'
import EditModal from '../edit-modal/EditModal'
import ProgressLoad from '../Progress-bar/ProgressLoad'

export default function VacationCard({ allVacations, setadminShow, setisModalOpen, isModalOpen, setImage, image, seteditVacation,
    editVacation }) {
    var dateFormat = require("dateformat");
    const [isLoad, setisLoad] = React.useState(false)

    const findVacation = async (id) => {
        const find = allVacations.find(vacation => vacation.id === id)
        setisLoad(true)
        seteditVacation(find)
        setTimeout(() => {
            setisModalOpen(true)
            setisLoad(false)
        }, 1000);
    }

    return (
        <div className='vacation-row-admin'>
            { isModalOpen &&
                <EditModal
                    seteditVacation={seteditVacation}
                    image={image}
                    setImage={setImage}
                    setadminShow={setadminShow}
                    allVacations={allVacations}
                    editVacation={editVacation}
                    setisModalOpen={setisModalOpen}
                    isModalOpen={isModalOpen}
                />}
            {  isLoad ? <ProgressLoad className='prigress-bar' /> : <>
                {allVacations.map((item, index) => {
                    return (
                        <Card className='card-roots'
                            key={index} >
                            <CardHeader
                                className='vacation-name'
                                style={{ textAlign: 'center' }}
                                title={item.destination}
                                subheader={item.description}
                            />
                            <CardMedia
                                className='card-media'
                                image={item.pics}
                            />
                            <CardContent>
                                <div><span>From: </span>{dateFormat(item.from_date, "dddd, mmmm d, yyyy")}</div>
                                <div><span>Till: </span>{dateFormat(item.till_date, "dddd, mmmm d, yyyy")}</div>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Price:  {item.price}
                                </Typography>
                            </CardContent>
                            <CardActions className='card-icons-warp'>
                                <EditIcon
                                    onClick={() => { findVacation(item.id) }}
                                    className='icons'
                                />

                                <DeleteVacation
                                    setisModalOpen={setisModalOpen}
                                    setadminShow={setadminShow}
                                    vacationId={item.id}
                                    className='icons'
                                />
                            </CardActions>
                        </Card>
                    )
                })}</>}
        </div>
    );
}
