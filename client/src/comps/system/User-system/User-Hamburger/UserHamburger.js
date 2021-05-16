import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './style.css';
import { useHistory } from 'react-router-dom'

export default function UserHamburger({ setToken }) {
    let history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);

    };
    const logOut = () => {
        localStorage.clear()
        setToken('')
        history.push('/login')
    }
    return (
        <div className='user-hamburgerr'>
            <MenuIcon className='menu-icon'
                aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
            />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem className='hamburger-item' onClick={logOut}>
                    <ExitToAppIcon />
                    <span></span>Logout
                </MenuItem>
            </Menu>
        </div>
    );
}
