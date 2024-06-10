import React from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import style from "./Setting.module.css"
import Message from '../icons/Message';

export default function Setting({ setSidebar, onDragEnd }: { setSidebar: any, onDragEnd: any }) {

    return (
        <div>
            <div className={style.header}>
                <IoArrowBackSharp onClick={() => setSidebar(<Message onDragEnd={onDragEnd} />)} />
                <p>Message</p>
            </div>
            <textarea name="text-message" id=""></textarea>
        </div>
    )
}
