import React from 'react'
import { Handle, Position } from "reactflow";
import { AiOutlineMessage } from "react-icons/ai";
import { RiWhatsappFill } from "react-icons/ri";
import styles from "./send-msg-node.module.css"

export default function SendMessageNode({ data }: { data: { label: string } }) {
    // data contains the data of the node which a Text Message in our app. The Text Message can be retrieved by accessing the label property of data object of the Node. 

    return (
        <div className={styles.customNode}>
            {/* Node source handle start */}
            <Handle type="target" position={Position.Left} />
            {/* Node source handle end */}

            {/* Node Header start */}
            <div className={styles.header}>
                <AiOutlineMessage size={10} />
                <p>Send Message</p>
                <div>
                    <RiWhatsappFill color='green' size={7} />
                </div>
            </div>
            {/* Node Header end */}

            {/* Node Text Message start */}
            <div>{data.label}</div>
            {/* Node Text Message end */}

            {/* Node target handle start */}
            <Handle type="source" position={Position.Right} />
            {/* Node target handle end */}
        </div>
    )
}
