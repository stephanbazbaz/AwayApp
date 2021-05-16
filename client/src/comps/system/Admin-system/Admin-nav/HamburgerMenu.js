import React from 'react';
import SpaIcon from '@material-ui/icons/Spa';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'

export default function HamburgerMenu({ setadmin }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    let history = useHistory()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);

    };
    const close = () => {
        setAnchorEl(null);
    }
    const logOut = () => {
        localStorage.clear()
        setadmin('')
        history.push('/login')
    }
    const styles = {
        largeIcon: {
            width: 40,
            height: 40,
        },
    };
    return (
        <div>
            <MenuIcon className='menu-iconn'
                style={styles.largeIcon}
                aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
            />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem><SpaIcon /><Link to="/addvacation" className='hamburger-item' onClick={close}><span></span>Add Vacation</Link></MenuItem>
                <MenuItem> <AssessmentIcon /><Link className='hamburger-item' to="/reports" onClick={close}><span></span>REPORTS</Link></MenuItem>
                <MenuItem className='hamburger-item' onClick={logOut}><ExitToAppIcon /><span></span>Logout</MenuItem>
            </Menu>
        </div>
    );
}
