import React, { useEffect, useState } from 'react'
import styles from "./Header.module.css"
import useApp from '../../context/AppContext';


export default React.memo(function Header() {

    const { clicked, failure, save, resetClick } = useApp();

    const [clas, setClas] = useState("");


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

    //The onSave() function triggers as the "Save Changes" button is clicked.
    function onSave() {
        save();
        setTimeout(() => {
            resetClick();
        }, 2000)
    }


    return (
        <div className={styles.container}>
            {/* Div for error display*/}
            <div className={failure ? `${clas}` : `${clas}`}>
                {failure ? "Can't save the Flow!" : "The Flow has been saved!"}
            </div>
            <p>Doubleclick on a node or an edge to delete it.</p>

            {/* Save Changes button */}
            <button className={styles.save}
                type='submit' onClick={() => onSave()}>Save Changes</button>
        </div>
    )
})
