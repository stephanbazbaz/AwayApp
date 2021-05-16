import React from 'react'
import Login from './Login'
import SignUp from './SignUp'
import './style.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

export default function Welcome({ setToken, setadmin }) {
    const [isOpen, setIsOpen] = React.useState(true)
    return (
        <div className='welcome-page' >
            {isOpen ?
                <Login
                    setIsOpen={setIsOpen}
                    setadmin={setadmin}
                    setToken={setToken}
                />
                :
                <SignUp
                    setIsOpen={setIsOpen}
                />}
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login
                            setIsOpen={setIsOpen}
                            setadmin={setadmin}
                            setToken={setToken}
                        />
                    </Route>
                    <Route path="/signup">
                        <SignUp
                            setIsOpen={setIsOpen}
                        />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
