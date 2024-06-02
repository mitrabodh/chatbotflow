import React, { DragEvent } from 'react'
import { useCallback, useState } from 'react'
import ReactFlow, { Connection, Edge, EdgeChange, Node, NodeChange, addEdge, applyEdgeChanges, applyNodeChanges, MiniMap, Controls, ReactFlowProvider, ReactFlowInstance, XYPosition } from 'reactflow'
import SendMessageNode from '../nodes/SendMessageNode'
import "reactflow/dist/style.css"
import Sidebar from '../sidebar/Sidebar'
import styles from "./flow.module.css"
import EmptyMsg from '../emptyMsg/EmptyMsg'



const initialNodes: Node[] = [];

const nodeTypes = { sendMsg: SendMessageNode };

let id = 0;

const getId = () => `node-${id++}`;

export default function Flow() {
    const [nodes, setNodes] = useState<Node<{ label: string }>[]>(initialNodes);
    const [edges, setEdges] = useState<Edge<any>[]>([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<null | ReactFlowInstance>(null);

    // Handles changes in the array of Nodes as well as the position of the Nodes.
    const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds: Node<{ label: string }>[]) => applyNodeChanges(changes, nds)), [setNodes]);

    // Handles changes in the array of edges.
    const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds: Edge<any>[]) => applyEdgeChanges(changes, eds)), [setEdges]);

    //Handles the connection between given Nodes by the edges.
    const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges])

    //DragOver Handler
    const onDragOver = useCallback((e: DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = "move"
        }
    }, []);

    //Drop Handler
    const onDrop = useCallback((e: DragEvent) => {
        e.preventDefault();
        const type = e.dataTransfer.getData("application/node");
        if (typeof type === "undefined" || !type) {
            return;
        }

        //We access the position of the new Node being created from the drag event.
        let position = reactFlowInstance?.screenToFlowPosition({
            x: e.clientX,
            y: e.clientY,
        });

        //If the position of the new Node is undefined, we set a default value for x and y axes as zero. 
        if (position === undefined) {
            position = { x: 0, y: 0 };
        }

        //We create a new node by taking data from the drag event.
        const newNode: Node<{ label: string }> = {
            id: getId(),
            type,
            position,
            data: { label: "msg" }
        };

        setNodes((nds) => nds.concat(newNode));
    }, [reactFlowInstance]);


    return (
        <div className={styles.container} >
            <ReactFlowProvider>
                <div className={styles.reactflow}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        fitView >
                        <Controls />
                        <MiniMap />
                        {nodes.length > 0 ? "" : <EmptyMsg />}
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
            <Sidebar />
        </div >

    )
}
