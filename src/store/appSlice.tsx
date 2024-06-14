import { ReactNode } from "react";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import Message from "../components/icons/Message";


export interface AppState {
    sidebar: ReactNode,
    text: string,
    error: boolean,
    failure: boolean,
    clicked: boolean,
    selectedNodes: string[],
    over: string,
}

const initialState: AppState = {
    sidebar: <Message />,
    text: "message",
    error: false,
    failure: false,
    clicked: false,
    selectedNodes: [],
    over: "",
}

export const appSplice = createSlice({
    name: "app",
    initialState,
    reducers: {
        save: (state) => {
            state.clicked = true;
            if (state.error) {
                state.failure = true;
            } else {
                state.failure = false;
            }
            // setTimeout(() => {
            //     state.clicked = false;
            // }, 2000);
        },
        resetClick: (state) => {
            state.clicked = false
        },
        onDragEnd: (state) => {
            state.over = "";
        },
        setOver: (state, action: PayloadAction<string>) => {
            state.over = action.payload;
        },
        setError: (state, action: PayloadAction<boolean>) => {
            state.error = action.payload;
        },
        setFailure: (state, action: PayloadAction<boolean>) => {
            state.failure = action.payload;
        },
        clicked: (state, action: PayloadAction<boolean>) => {
            state.clicked = action.payload;
        },
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
        setSidebar: (state, action: PayloadAction<JSX.Element>) => {
            state.sidebar = action.payload;
        },
        setSelectedNodes: (state, action: PayloadAction<string[]>) => {
            state.selectedNodes = action.payload;
        }
    }
});

export const { save, onDragEnd, setOver, setError, setFailure, resetClick, clicked, setText, setSidebar, setSelectedNodes } = appSplice.actions;
export default appSplice.reducer;