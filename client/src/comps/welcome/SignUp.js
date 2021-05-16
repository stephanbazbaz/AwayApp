import React from 'react'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import { domain } from '../../config'
import ICON from '../../assets/favicon.ico'

export default function SignUp({ setIsOpen }) {

    let history = useHistory()
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [userName, setuserName] = useState('')
    const [password, setPassword] = useState('')

    const register = async () => {
        try {
            const res = await fetch(domain + '/signup', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ firstName, lastName, userName, password })
            });
            const data = await res.json()
            if (!data.status) {
                alert('user name is taken')
                return
            }
            else {
                setIsOpen(true)
                history.push('/login')
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='mega-form'>
            <div className='sign-up-form demoObject'>
            <img style={{width:'80px'}} src={ICON}/>
                <h3>SIGN UP </h3>
                <Input type='text' value={firstName} onChange={(event) => { setfirstName(event.target.value) }}
                    className='my-input'
                    placeholder='firstName' />
                <Input type="text" value={lastName} onChange={(event) => { setlastName(event.target.value) }}
                    placeholder='lastName'
                    className='my-input' />
                <Input type="text" value={userName} onChange={(event) => { setuserName(event.target.value) }}
                    placeholder='userName'
                    className='my-input' />
                <Input type='password' value={password} onChange={(event) => { setPassword(event.target.value) }}
                    placeholder='password'
                    className='my-input' />
                <div className='sign-up-btn'>
                    <Button
                        onClick={register}
                    >Sign-Up</Button>
                </div>
                <div className='forget-password' >
                    <p>already have a user ? </p>
                    <Link onClick={() => { setIsOpen(true) }} to="/login">login here</Link>
                </div>
            </div>
        </div>
    )
}
