import './App.css';
import React from 'react'
import Welcome from '../src/comps/welcome/Welcome'
import UserSystem from './comps/system/User-system/UserSystem'
import AdminPage from './comps/system/Admin-system/AdminPage'
function App() {
  const [token, setToken] = React.useState(localStorage.getItem('user'))
  const [admin, setadmin] = React.useState(localStorage.getItem('admin'))
  return (
    <div className="App">
      <div className='container'>
        {!token && !admin ?
          <Welcome
            setadmin={setadmin}
            setToken={setToken}
          />
          :
          token && !admin ?
            <UserSystem
              setadmin={setadmin}
              setToken={setToken}
            />
            :
            admin &&
            <AdminPage
            setadmin={setadmin}
             />}
      </div>
    </div>
  );
}

export default App;
