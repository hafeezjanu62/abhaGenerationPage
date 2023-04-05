import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import logo from '../Images/Swaasa.png'
import '../Styles/AppBar.css'

function AppBar() {
    const [showElement, setShowElement] = useState(false)
    const toggleNav = () => {setShowElement(!showElement)}

    return (
       <>
       <header className="header">
        <div className="container container-flex">
            <div>
                <img src={logo} alt="logo" className="logo"/>
            </div>
           
            <nav >
                <div className={showElement ? "toggleNav" :"toggleNav1"}>
                    <div className='spaceBox' ></div>
                    <NavLink to="" className="listItem">Solutions</NavLink>
                    <NavLink to="" className="listItem">About Us</NavLink>
                    <NavLink to="" className="listItem">Contact</NavLink>
                </div>
            </nav>
            <div className='menu' onClick={toggleNav}>
                <div className='menuLine'></div>
                <div className='menuLine'></div>
                <div className='menuLine'></div>
            </div>

            <div className={showElement ? "toggleNav " :"toggleNav1 button container-flex"} >
                <div className='buttonText'>
                SCHEDULE A DEMO
                </div>
             
            </div>

        </div>
       </header>
       </>
    )
}
export default AppBar;