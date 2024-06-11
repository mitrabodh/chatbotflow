import React, { useState } from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import style from "./Setting.module.css"
import Message from '../icons/Message';


export default function Setting({ setSidebar, onDragEnd, selectedNodes }: { setSidebar: any, onDragEnd: any, selectedNodes: string[] }) {

    return (
        <div>
            <div className={style.header}>
                <IoArrowBackSharp onClick={() => setSidebar(<Message onDragEnd={onDragEnd} selectedNodes={selectedNodes} />)} />
                <p>Message</p>
            </div>
            <textarea name="text-message" placeholder="write your message here." id=""></textarea>
        </div>
    )
}
