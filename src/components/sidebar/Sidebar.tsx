import React, { useEffect } from 'react';
import styles from "./Sidebar.module.css";
import Message from '../icons/Message';
import Settings from '../settings/Settings';
import useApp from '../../context/AppContext';



export default React.memo(function Sidebar() {

    const { setSidebar, sidebar, selectedNodes } = useApp();

    useEffect(() => {
        if (selectedNodes.length > 0) {
            setSidebar(<Settings />);
        } else {
            setSidebar(<Message />);
        }
    }, [selectedNodes]);

    return (
        <aside className={styles.panel}>
            {sidebar}
        </aside>
    );
})
