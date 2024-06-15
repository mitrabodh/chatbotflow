import { createContext, useReducer, ReactNode, useContext } from "react";
import AppReducer, { initialState } from "./AppReducer";


export const AppContext = createContext(initialState);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const save = () => {
        if (state.error) {
            state.failure = true;
        } else {
            state.failure = false;
        };
        dispatch({
            type: "SAVE",
        });
    };
    const resetClick = () => {
        dispatch({
            type: "RESETCLICK",
        });
    };
    const onDragEnd = () => {
        dispatch({
            type: "ONDRAGEND",
        });
    };
    const setOver = () => {
        dispatch({
            type: "SETOVER"
        });
    };
    const setError = (error: boolean) => {
        dispatch({
            type: "SETERROR",
            payload: error
        });
    };
    const setSidebar = (sideBar: ReactNode) => {
        dispatch({
            type: "SETSIDEBAR",
            payload: sideBar
        });
    };
    const setSelectedNodes = (selectedNodes: []) => {
        dispatch({
            type: "SETSELECTEDNODES",
            payload: selectedNodes
        });
    };
    const setText = (text: string) => {
        dispatch({
            type: "SETTEXT",
            payload: text
        })
    }

    const value = {
        text: state.text,
        clicked: state.clicked,
        error: state.error,
        failure: state.failure,
        selectedNodes: state.selectedNodes,
        over: state.over,
        sidebar: state.sidebar,
        save,
        resetClick,
        onDragEnd,
        setOver,
        setError,
        setSidebar,
        setSelectedNodes,
        setText
    }

    return (<AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>);
};

const useApp = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error("Context is not found");
    }
    return context;
}

export default useApp;