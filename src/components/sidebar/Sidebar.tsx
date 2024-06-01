import React from 'react'
import { AiOutlineMessage } from "react-icons/ai";
import styles from "./sidebar.module.css"

export default function Sidebar() {
    return (
        <aside className={styles.panel}>
            <div className={styles.icon}>
                <AiOutlineMessage size={30} color='rgb(54, 32, 105)' />
                <p>Message</p>
            </div>

        </aside>
    )
}
