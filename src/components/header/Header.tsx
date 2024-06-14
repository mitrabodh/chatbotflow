import React, { useEffect, useState } from 'react'
import styles from "./Header.module.css"
import { save, resetClick } from '../../store/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store'

export default React.memo(function Header() {

    const clicked = useSelector((state: RootState) => state.app.clicked);
    const failure = useSelector((state: RootState) => state.app.failure);
    const [clas, setClas] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (clicked) {
            if (failure) {
                setClas(styles.error);
            } else {
                setClas(styles.pass);
            }
        } else {
            setClas("");
        }
    }, [clicked])

    //onSave() function triggers as the "Save Changes" button is clicked.
    function onSave() {
        dispatch(save());
        setTimeout(() => {
            dispatch(resetClick());
        }, 2000)
    }


    return (
        <div className={styles.container}>
            {/* Div for error display*/}
            <div className={failure ? `${clas}` : `${clas}`}>
                {failure ? "An error occurred!" : "Changes have been saved!"}
            </div>

            {/* Save Changes button */}
            <button className={styles.save}
                //  onClick={saveFunction}
                type='submit' onClick={() => onSave()}>Save Changes</button>
        </div>
    )
})
