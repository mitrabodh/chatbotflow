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

    //onSave() function triggers as the "Save Changes" button is clicked.
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
                {failure ? "An error occurred!" : "Changes have been saved!"}
            </div>

            {/* Save Changes button */}
            <button className={styles.save}
                //  onClick={saveFunction}
                type='submit' onClick={() => onSave()}>Save Changes</button>
        </div>
    )
})
