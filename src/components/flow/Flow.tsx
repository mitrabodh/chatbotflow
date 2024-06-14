import React, { useState, ReactNode } from 'react'
import Sidebar from '../sidebar/Sidebar'
import styles from "./Flow.module.css"
import Canvas from './Canvas'
import Message from '../icons/Message'
import Header from '../header/Header'


export default function Flow() {

    return (
        <>
            <Header />
            <div className={styles.container} >
                <Canvas />
                <Sidebar />
            </div >
        </>
    )
}

