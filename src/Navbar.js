import React from 'react'
import logo from './logo.jpg';
import { Button } from '@mui/material';
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className={styles.main} >
            <div className={styles.left} >
                <img src={logo} />
                <div className={styles.title} >
                    <h1>StudiousStudents</h1> <br />
                    <span> Studies are a top priority here  </span>
                </div>
            </div>


            <div className={styles.right}>
                <Button className={styles.button} sx={{ margin: '5px' }} variant='outlined'>
                    <Link to='/' style={{ textDecoration: 'none' }}>New Enquiry</Link>
                </Button>
                <Button className={styles.button} sx={{ margin: '5px' }} variant='outlined'>
                    <Link to='/existed enquiry' style={{ textDecoration: 'none' }}>Existing Enquiry</Link>
                </Button>
            </div>

        </div>
    )
}

export default Navbar
