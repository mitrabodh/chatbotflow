import React, { ReactNode, useEffect, useState } from 'react'
import styles from "./Sidebar.module.css"
import Message from '../icons/Message'
import Setting from '../settings/Setting'


export default function Sidebar({ onDragEnd, selectedNodes, setSidebar, sidebar }: { onDragEnd: any, selectedNodes: string[], setSidebar: any, sidebar: any }) {

    useEffect(() => {
        if (selectedNodes.length > 0) {
            setSidebar(<Setting setSidebar={setSidebar} onDragEnd={onDragEnd} selectedNodes={selectedNodes} />);
        } else {
            setSidebar(<Message onDragEnd={onDragEnd} selectedNodes={selectedNodes} />);
        }
    }, [selectedNodes])

    return (
        <aside className={styles.panel}>
            {sidebar}
        </aside>
    )
}
