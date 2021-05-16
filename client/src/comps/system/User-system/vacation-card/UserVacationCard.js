import React from 'react';
import './style.css';
import './mediaQuery.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Followers from './Followers'
export default function UserVacationCard({ allVacations, setshow }) {

    var dateFormat = require("dateformat");
    return (
        <div className='vacation-row'>
            { allVacations.map((item, index) => {
                return item.vacation ? (
                    <Card className='card-root'
                        key={index} >
                        <CardHeader
                            className='vacation-name'
                            style={{ textAlign: 'center' }}
                            title={item.vacation.destination}
                            subheader={item.vacation.description}
                        />
                        <CardMedia
                            className='card-media'
                            image={item.vacation.pics}
                        />
                        <CardContent>
                            <div><span>from: </span>{dateFormat(item.vacation.from_date, "dddd, mmmm d, yyyy")}</div>
                            <div><span>till: </span>{dateFormat(item.vacation.till_date, "dddd, mmmm d, yyyy")}</div>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Price:  {item.vacation.price}
                            </Typography>
                            <CardActions>
                                <Followers
                                    allVacations={allVacations}
                                    setshow={setshow}
                                    followersArr={item.vacation.followers}
                                    vacationId={item.vacation.id}
                                />
                                <div className='followers-num'>{item.vacation.followers.length}</div>
                            </CardActions>
                        </CardContent>
                    </Card>
                )
                    :
                    (
                        <Card className='card-root'
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
                                <div><span>from: </span>{dateFormat(item.from_date, "dddd, mmmm d, yyyy")}</div>
                                <div><span>till: </span>{dateFormat(item.till_date, "dddd, mmmm d, yyyy")}</div>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Price:  {item.price}
                                </Typography>
                                <CardActions>
                                    <Followers
                                        allVacations={allVacations}
                                        setshow={setshow}
                                        followersArr={item.followers}
                                        vacationId={item.id}
                                    />
                                    <div className='followers-num'>{item.followers.length}</div>
                                </CardActions>
                            </CardContent>
                        </Card>
                    )
            })}
        </div>
    );
}
