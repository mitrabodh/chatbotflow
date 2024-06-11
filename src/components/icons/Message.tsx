import React from 'react'
import { AiOutlineMessage } from "react-icons/ai";
import styles from "./Icons.module.css";



export default function Message({ onDragEnd, selectedNodes }: { onDragEnd: any, selectedNodes: string[] }) {

    const onDragStart = (event: any, nodeType: string) => {
        event.dataTransfer.setData("application/node", nodeType);
        event.dataTransfer.effectAllowed = "move";

    };


    return (

        <div className={styles.icon} draggable onDragEnd={onDragEnd} onDragStart={(event) => onDragStart(event, "sendMsg")}  >
            <AiOutlineMessage size={30} color='rgb(54, 32, 105)' />
            <p>Message</p>
        </div>

    )
}
