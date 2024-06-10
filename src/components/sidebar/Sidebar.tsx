import React, { ReactNode, useEffect, useState } from 'react'
import styles from "./Sidebar.module.css"
import Message from '../icons/Message'
import Setting from '../settings/Setting'


export default function Sidebar({ onDragEnd, selectedNodes, setSidebar, sidebar }: { onDragEnd: any, selectedNodes: any, setSidebar: any, sidebar: any }) {

    useEffect(() => {
        if (selectedNodes.length > 0) {
            setSidebar(<Setting setSidebar={setSidebar} onDragEnd={onDragEnd} />);
        } else {
            setSidebar(<Message onDragEnd={onDragEnd} />);
        }
    }, [selectedNodes])

    return (
        <aside className={styles.panel}>
            {sidebar}
        </aside>
    )
}
