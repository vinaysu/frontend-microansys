import React from 'react'
import logo from './SS logo for website.png';
import { Button } from '@mui/material';
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className={styles.main} >
            <div className={styles.left} >
                <img src={logo} />

            </div>


            <div className={styles.right}>

                <span className={styles.link} >
                    <Link to='/' style={{ textDecoration: 'none', color: 'black', fontWeight: '450' }}>New enquiry</Link>
                </span>


                <span className={styles.link} >
                    <Link to='/existed enquiry' style={{ textDecoration: 'none', color: 'black', fontWeight: '450' }}>Existing enquiry</Link>
                </span>

            </div>

        </div>
    )
}

export default Navbar
