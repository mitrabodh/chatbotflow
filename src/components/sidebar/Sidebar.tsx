import React, { useEffect } from 'react'
import styles from "./Sidebar.module.css"
import Message from '../icons/Message'
import Settings from '../settings/Settings'
import { setSidebar } from '../../store/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'


export default React.memo(function Sidebar() {

    const dispatch = useDispatch();

    const selectedNodes = useSelector((state: RootState) => state.app.selectedNodes)
    const sidebar = useSelector((state: RootState) => state.app.sidebar);

    useEffect(() => {
        if (selectedNodes.length > 0) {
            dispatch(setSidebar(<Settings />));
        } else {
            dispatch(setSidebar(<Message />));
        }
    }, [selectedNodes])

    return (
        <aside className={styles.panel}>
            {sidebar}
        </aside>
    )
})
