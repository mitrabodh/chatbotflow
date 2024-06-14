import React from 'react'
import { AiOutlineMessage } from "react-icons/ai";
import styles from "./Icons.module.css";
import { onDragEnd } from '../../store/appSlice';
import { useDispatch } from 'react-redux';



export default function Message() {

    const dispact = useDispatch();

    const onDragStart = (event: any, nodeType: string) => {
        event.dataTransfer.setData("application/node", nodeType);
        event.dataTransfer.effectAllowed = "move";

    };

    return (

        <div className={styles.icon} draggable onDragEnd={() => dispact(onDragEnd())} onDragStart={(event) => onDragStart(event, "sendMsg")}  >
            <AiOutlineMessage size={30} color='rgb(54, 32, 105)' />
            <p>Message</p>
        </div>

    )
}
