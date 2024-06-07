import React, { SetStateAction } from 'react'
import styles from "./Sidebar.module.css"
import Message from '../icons/Message'


export default function Sidebar({ onDragEnd }: { onDragEnd: any }) {

    return (
        <aside className={styles.panel}>
            <Message onDragEnd={onDragEnd} />
        </aside>
    )
}
