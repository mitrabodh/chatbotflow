import React from 'react'
import styles from "./flowHead.module.css"
export default function FlowHead() {
    return (
        <div className={styles.container}>
            {/* Div for error display*/}
            <div></div>

            {/* Save Changes button */}
            <button className={styles.save} type='submit'>Save Changes</button>
        </div>
    )
}
