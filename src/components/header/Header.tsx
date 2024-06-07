import React from 'react'
import styles from "./Header.module.css"
export default function Header() {
    return (
        <div className={styles.container}>
            {/* Div for error display*/}
            <div></div>

            {/* Save Changes button */}
            <button className={styles.save} type='submit'>Save Changes</button>
        </div>
    )
}
