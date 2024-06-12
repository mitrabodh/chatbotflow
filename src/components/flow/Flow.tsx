import React, { useCallback, ReactNode, useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import Message from '../icons/Message'
import styles from "./Flow.module.css"
import Canvas from './Canvas'
import Header from '../header/Header'


export default function Flow() {


    const [over, setOver] = useState<string | null>(null);

    const onDragEnd = () => {
        setOver(null);
    };

    const [selectedNodes, setSelectedNodes] = useState([]);
    const [sidebar, setSidebar] = useState<ReactNode>(<Message onDragEnd={onDragEnd} selectedNodes={selectedNodes} />)
    const [text, setText] = useState<string>("message");
    const [error, setError] = useState<boolean>(false);
    const [failure, setFailure] = useState<boolean>(false);
    const [clicked, setClicked] = useState(false);
    const [clas, setClas] = useState<any>("")


    function saveFunction() {
        setClicked(true);
        if (error) {
            setFailure(true);
        } else {
            setFailure(false);
        }
        setTimeout(() => {
            setClicked(false);
        }, 2000);

    }

    return (
        <>
            <Header clicked={clicked} setClas={setClas} clas={clas} saveFunction={saveFunction} failure={failure} />
            <div className={styles.container} >
                <Canvas error={error} setError={setError} text={text} setSelectedNodes={setSelectedNodes} onDragEnd={onDragEnd} over={over} setOver={setOver} selectedNodes={selectedNodes} />
                <Sidebar setText={setText} sidebar={sidebar} setSidebar={setSidebar} onDragEnd={onDragEnd} selectedNodes={selectedNodes} />
            </div >
        </>
    )
}

