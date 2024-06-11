import React, { useCallback, ReactNode, useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import Message from '../icons/Message'
import styles from "./Flow.module.css"
import Canvas from './Canvas'


export default function Flow() {

    const [over, setOver] = useState<string | null>(null);

    const onDragEnd = () => {
        setOver(null);
    };

    const [selectedNodes, setSelectedNodes] = useState([]);
    const [sidebar, setSidebar] = useState<ReactNode>(<Message onDragEnd={onDragEnd} selectedNodes={selectedNodes} />)


    return (
        <div className={styles.container} >
            <Canvas setSelectedNodes={setSelectedNodes} onDragEnd={onDragEnd} over={over} setOver={setOver} selectedNodes={selectedNodes} />
            <Sidebar sidebar={sidebar} setSidebar={setSidebar} onDragEnd={onDragEnd} selectedNodes={selectedNodes} />
        </div >
    )
}

