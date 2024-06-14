import React, { useState } from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import style from "./Settings.module.css"
import Message from '../icons/Message';
import { setSidebar, setText } from '../../store/appSlice';
import { useDispatch } from 'react-redux';


export default function Settings() {


    const dispatch = useDispatch();

    return (
        <div>
            <div className={style.header}>
                <IoArrowBackSharp onClick={() => dispatch(setSidebar(<Message />))} />
                <p>Message</p>
            </div>
            <textarea name="text-message" defaultValue="message" onChange={(e) => dispatch(setText(e.target.value))} placeholder="write your message here." id=""></textarea>
            <p>Please press <span>Enter</span> if length of the text message exceeds width of the node.</p>
        </div>
    )
}
