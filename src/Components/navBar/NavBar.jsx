import { useContext, useState } from 'react';
import styled from './navbar.module.css';
import { AppContext } from '../../App';


const NavBar = () => {
    const {isDarkMode, setIsDarkMode}= useContext(AppContext)

    
    return ( 
        <div className={isDarkMode ? `${styled.navBar} ${styled.darkMode}` : styled.navBar}>

            <div className={styled.container}>
                <label className={styled.switch}>
                    <input type="checkbox" 
                    onChange={()=>setIsDarkMode(!isDarkMode)  }
                    checked = {isDarkMode}
                    />
                    <span className={`${styled.slider} ${styled.round}`}></span>
                </label>
            </div>
        </div>
     );
}
 
export default NavBar;