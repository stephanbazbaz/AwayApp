import React from 'react'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import { domain } from '../../config'
import ICON from '../../assets/favicon.ico'
export default function Login({ setToken, setadmin, setIsOpen }) {

    let history = useHistory()
    const [userName, setuserName] = useState('')
    const [password, setPassword] = useState('')
    const login = async () => {

        try {
            const res = await fetch(domain + '/login', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ userName, password })
            })
            const data = await res.json()
            let success = data.success
            let admin = data.admin
            let id = data.id
            if (success) {
                localStorage.setItem('user', JSON.stringify({ userName, password, id }))
                setToken(userName)
                history.push('/')
            }
            else if (admin) {
                localStorage.setItem('admin', JSON.stringify({ userName, password }))
                setadmin(userName)
                history.push('/')
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='mega-form'>
            <div className='sign-up-form demoObject'>
            <img style={{width:'80px'}} src={ICON}/>
                <h3>LOG AWAY</h3>
                <Input type='text'
                    value={userName}
                    onChange={(event) => { setuserName(event.target.value) }}
                    className='my-input'
                    placeholder='User Name' />
                <Input type="password"
                    value={password}
                    onChange={(event) => { setPassword(event.target.value) }}
                    placeholder='Password'
                    className='my-input' />
                <div className='sign-up-btn'>
                    <Button
                        onClick={login}
                    >Login</Button>
                </div>
                <div className='forget-password'>
                    <Link onClick={() => { setIsOpen(false) }} to="/signup" >Register here</Link>
                </div>
            </div>

        </div>
    )
}
