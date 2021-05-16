import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './style.css';
import './query.css';
import HomeIcon from '@material-ui/icons/Home';
import HamburgerMenu from './HamburgerMenu'
import AddVacation from '../add-vacation/AddVacation'
import Reports from '../reports/Reports'
import VacationCard from '../VacationCard/VacationCard'
export default function AdminNavBar({ setadmin, isModalOpen, setisModalOpen, setadminShow, allVacations, seteditVacation, editVacation }) {
    const user = JSON.parse(localStorage.getItem('admin'))
    const [image, setImage] = React.useState(editVacation.pics)
    const styles = {
        largeIcon: {
            width: 40,
            height: 40,
        },
    };
    return (
        <Router>
            <div className='admin-nav'>
                <Link to="/home"><HomeIcon
                    style={styles.largeIcon}
                />
                </Link>
                <div className='welcome-user navlink'>Welcome &nbsp;<span className='user-name'>{user.userName}</span></div>
                <HamburgerMenu
                    setadmin={setadmin}
                />
            </div>
            <Switch>
                <Route path="/reports">
                    <Reports
                        allVacations={allVacations}
                    />
                </Route>
                <Route path="/addvacation">
                    <AddVacation
                        editVacation={editVacation}
                        setadminShow={setadminShow}
                        setImage={setImage}
                        image={image}
                    />
                </Route>
                <Route path="/">
                    <VacationCard
                        seteditVacation={seteditVacation}
                        editVacation={editVacation}
                        setImage={setImage}
                        image={image}
                        isModalOpen={isModalOpen}
                        setisModalOpen={setisModalOpen}
                        setadminShow={setadminShow}
                        allVacations={allVacations}
                    />
                </Route>
            </Switch>
        </Router>
    )
}
