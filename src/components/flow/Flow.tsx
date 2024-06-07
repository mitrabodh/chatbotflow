import React, { useCallback, useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import styles from "./Flow.module.css"
import Canvas from './Canvas'


export default function Flow() {
    const [over, setOver] = useState<string | null>(null);
    const onDragEnd = () => {
        setOver(null);
    };

    return (
        <div className={styles.container} >
            <Canvas onDragEnd={onDragEnd} over={over} setOver={setOver} />
            <Sidebar onDragEnd={onDragEnd} />
        </div >
    )
}

