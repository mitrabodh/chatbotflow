import React from 'react';
import ReactFlow, { Node, MiniMap, Controls, ReactFlowProvider } from 'reactflow';
import "reactflow/dist/style.css";
import styles from "./Flow.module.css";
import EmptyMsg from '../emptyMsg/EmptyMsg';
import SendMessageNode from '../nodes/SendMessageNode';
import CustomEdge from '../edges/CustomEdge';
import "../nodes/Custom.css";
import useCanvas from '../../hooks/useCanvas';


const initialNodes: Node[] = [];

let id = 0;

const getId = () => `node-${id++}`;

const nodeTypes = { sendMsg: SendMessageNode };
const edgeTypes = { customEdge: CustomEdge };


export default function Canvas() {


    const { nodes, edges, onNodesChange, onEdgesChange, setReactFlowInstace, onConnect, onDrop, onChange, onDragOver, onDragEnter, onEdgeDoubleClick, onNodeDoubleClick, over, flowDragEndStyle, flowDragOverStyle, reactFlowWrapper } = useCanvas(initialNodes, getId);

    return (
        <ReactFlowProvider>
            <div className={styles.reactflow} ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onInit={setReactFlowInstace}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onDrop={onDrop}
                    onSelectionChange={onChange}
                    onDragOver={onDragOver}
                    onDragEnter={onDragEnter}
                    onEdgeDoubleClick={onEdgeDoubleClick}
                    onNodeDoubleClick={onNodeDoubleClick}
                    fitView
                    style={over ? flowDragOverStyle : flowDragEndStyle}
                >
                    <Controls />
                    <MiniMap />
                    {nodes.length > 0 ? "" : <EmptyMsg />}
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    );
}
