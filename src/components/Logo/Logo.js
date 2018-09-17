import React from "react";
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './logo.jpg'
const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 175 , width: 150 }} >
                <div className="Tilt-inner pa3.5"> <img style={{paddingBottom:'30pm'}} alt='logo' src={logo}/> </div>
            </Tilt>
        </div>
    )
}
export default Logo;