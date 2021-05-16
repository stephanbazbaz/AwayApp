import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './style.css';
import HomePage from '../homepage/HomePage'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
export default function Navbar({ setToken, allVacations, setshow, setallVacations, show, searchVac, setsearchVac }) {
    const user = JSON.parse(localStorage.getItem('user'))
    let history = useHistory()
    const logOut = () => {
        localStorage.clear()
        setToken('')
        history.push('/')
    }
    const backToHome = () => {
        setsearchVac([{
            destination: '',
            from: '',
            till: ''
        }])
    }
    const styles = {
        largeIcon: {
            width: 40,
            height: 40,
        },
    };
    return (
        <Router>
            <div className='navbar'>
                <Link onClick={backToHome} to="/">
                    <HomeIcon
                        style={styles.largeIcon}
                    /></Link>
                <div className='welcome-user navlinkk'>Welcome &nbsp; <span className='user-name'>{user.userName}</span></div>
                <ExitToAppIcon
                    style={styles.largeIcon}
                    className='logOut-icon'
                    onClick={logOut} />
            </div>
            <Switch>
                <Route path="/">
                    <HomePage
                        setsearchVac={setsearchVac}
                        searchVac={searchVac}
                        setallVacations={setallVacations}
                        setshow={setshow}
                        allVacations={allVacations}
                        show={show}
                    />
                </Route>
            </Switch>
        </Router>
    )
}
