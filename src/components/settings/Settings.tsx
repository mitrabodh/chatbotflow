import React, { useState } from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import style from "./Settings.module.css"
import Message from '../icons/Message';


export default function Settings({ setSidebar, onDragEnd, selectedNodes, setText }: { setSidebar: any, onDragEnd: any, selectedNodes: string[], setText: any }) {

    return (
        <div>
            <div className={style.header}>
                <IoArrowBackSharp onClick={() => setSidebar(<Message onDragEnd={onDragEnd} selectedNodes={selectedNodes} />)} />
                <p>Message</p>
            </div>
            <textarea name="text-message" defaultValue="message" onChange={(e) => setText(e.target.value)} placeholder="write your message here." id=""></textarea>
            <p>Please press <span>Enter</span> if length of the text message exceeds width of the node.</p>
        </div>
    )
}
