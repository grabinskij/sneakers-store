import React from "react";
import styles from './NotFoundBlock.module.scss'

export const NotFoundBlock: React.FC = () => {
    return(
        <div className={styles.root}>
            <h1>Unfortunately nothing was found :(</h1>
            <p className={styles.description}>Sorry, we can not find this page on our website</p>
        </div>
    )
}
