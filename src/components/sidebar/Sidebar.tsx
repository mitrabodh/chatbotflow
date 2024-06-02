import React from 'react'
import { AiOutlineMessage } from "react-icons/ai";
import styles from "./sidebar.module.css"

export default function Sidebar() {
    const onDragStart = (e: React.DragEvent<HTMLDivElement>, nodeType: string) => {
        e.dataTransfer?.setData("application/node", nodeType);
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move";
        }
    }
    return (
        <aside className={styles.panel}>
            <div className={styles.icon} draggable onDragStart={(e) => onDragStart(e, "sendMsg")}>
                <AiOutlineMessage size={30} color='rgb(54, 32, 105)' />
                <p>Message</p>
            </div>

        </aside>
    )
}
