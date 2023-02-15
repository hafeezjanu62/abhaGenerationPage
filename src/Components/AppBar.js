import { NavLink } from 'react-router-dom';
import logo from '../Images/Swaasa.png'
import '../Styles/AppBar.css'

function AppBar() {
    return (
       <>
       <header className="header">
        <div className="container container-flex">
            <div>
                <img src={logo} alt="logo" className="logo"/>
            </div>
           
            <nav>
                <div className='spaceBox'></div>
                <NavLink to="" className="listItem">Solutions</NavLink>
                <NavLink to="" className="listItem">About Us</NavLink>
                <NavLink to="" className="listItem">Contact</NavLink>
            </nav>
            <div className='button container-flex' >
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