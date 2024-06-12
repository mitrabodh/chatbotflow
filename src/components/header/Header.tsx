import React, { useEffect } from 'react'
import styles from "./Header.module.css"
export default function Header({ clicked, setClas, clas, failure, saveFunction }: { failure: boolean, saveFunction: any, clicked: boolean, setClas: any, clas: any }) {

    useEffect(() => {
        if (clicked) {
            if (failure) {
                setClas(styles.error);
            } else {
                setClas(styles.pass);
            }
        } else {
            setClas("")
        }
    }, [clicked])


    return (
        <div className={styles.container}>
            {/* Div for error display*/}
            <div className={failure ? `${clas}` : `${clas}`}>
                {failure ? "An error occurred!" : "Changes have been saved!"}
            </div>

            {/* Save Changes button */}
            <button className={styles.save}
                //  onClick={saveFunction}
                type='submit' onClick={saveFunction}>Save Changes</button>
        </div>
    )
}
