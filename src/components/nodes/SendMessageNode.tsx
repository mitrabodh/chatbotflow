import React from 'react';
import { Handle, Position } from "reactflow";
import { AiOutlineMessage } from "react-icons/ai";
import { RiWhatsappFill } from "react-icons/ri";
import styles from "./Send-msg-node.module.css";
import "reactflow/dist/style.css";
import "./Custom.css";


export default React.memo(function SendMessageNode({ id, data }: { id: string, data: { label: string } }) {
    // data contains the data of the node which a Text Message in our app. The Text Message can be retrieved by accessing the label property of data object of the Node. 


    return (
        <div className={styles.customNode}>
            {/* Node source handle start */}
            <Handle type="target" position={Position.Left} style={{ background: " rgba(50, 65, 229, 0.84)" }} />
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
            <Handle type="source" style={{ background: " rgba(50, 65, 229, 0.84)" }} position={Position.Right} />
            {/* Node target handle end */}
        </div>
    );
})
