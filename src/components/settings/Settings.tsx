import React from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import style from "./Settings.module.css"
import Message from '../icons/Message';
import useApp from '../../context/AppContext';



export default function Settings() {

    const { setSidebar, setText } = useApp();

    return (
        <div>
            <div className={style.header}>
                <IoArrowBackSharp onClick={() => setSidebar(<Message />)} />
                <p>Message</p>
            </div>
            <textarea name="text-message" defaultValue="message" onChange={(e) => setText(e.target.value)} placeholder="write your message here." id=""></textarea>
            <p>Please press <span>Enter</span> if length of the text message exceeds width of the node.</p>
        </div>
    )
}
