import { ReactNode } from "react";
import Message from "../components/icons/Message";


interface AppState {
    sidebar: ReactNode,
    text: string,
    error: boolean,
    failure: boolean,
    clicked: boolean,
    selectedNodes: string[],
    over: string,
    setSelectedNodes: any
    save: any,
    resetClick: any,
    onDragEnd: any,
    setOver: any,
    setError: any,
    setSidebar: any,
    setText: any
};

const initialState: AppState = {
    sidebar: <Message />,
    text: "message",
    error: false,
    failure: false,
    clicked: false,
    selectedNodes: [],
    over: "",
    setSelectedNodes: "",
    save: "",
    resetClick: "",
    onDragEnd: "",
    setOver: "",
    setError: "",
    setSidebar: "",
    setText: ""
};

const AppReducer = (state: any, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case "SAVE":
            return {
                ...state,
                clicked: true,
            };
        case "RESETCLICK":
            return {
                ...state,
                clicked: false,
            };
        case "ONDRAGEND":
            return {
                ...state,
                over: "",
            };
        case "SETOVER":
            return {
                ...state,
                over: "over",
            };
        case "SETERROR":
            return {
                ...state,
                error: payload,
            };
        case "SETFAILURE":
            return {
                ...state,
                failure: payload,
            };
        case "SETTEXT":
            return {
                ...state,
                text: payload,
            };
        case "SETSIDEBAR":
            return {
                ...state,
                sidebar: payload,
            };
        case "SETSELECTEDNODES":
            return {
                ...state,
                selectedNodes: payload,
            };
        default:
            throw new Error(`No case for ${type} found.`);
    };
};

export default AppReducer;
export { initialState };
