import React, { ReactNode, useEffect, useState } from 'react'
import styles from "./Sidebar.module.css"
import Message from '../icons/Message'
import Settings from '../settings/Settings'


export default function Sidebar({ setText, onDragEnd, selectedNodes, setSidebar, sidebar }: { onDragEnd: any, selectedNodes: string[], setSidebar: any, sidebar: any, setText: any }) {

    useEffect(() => {
        if (selectedNodes.length > 0) {
            setSidebar(<Settings setText={setText} setSidebar={setSidebar} onDragEnd={onDragEnd} selectedNodes={selectedNodes} />);
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
