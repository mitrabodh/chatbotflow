import React, { useEffect, useRef, useMemo } from 'react'
import { useCallback, useState } from 'react'
import ReactFlow, { useReactFlow, Connection, Edge, EdgeChange, Node, NodeChange, addEdge, applyEdgeChanges, applyNodeChanges, MiniMap, Controls, ReactFlowProvider, ReactFlowInstance, XYPosition, Background, useOnSelectionChange } from 'reactflow'
import "reactflow/dist/style.css"
import styles from "./Flow.module.css"
import EmptyMsg from '../emptyMsg/EmptyMsg'
import SendMessageNode from '../nodes/SendMessageNode'
import "../nodes/Custom.css"


const initialNodes: Node[] = [];

let id = 0;

const getId = () => `node-${id++}`;

const nodeTypes = { sendMsg: SendMessageNode };


export default function Canvas({ onDragEnd, over, setOver }: { onDragEnd: any, over: string | null, setOver: any }) {

    const reactFlowWrapper = useRef(null);
    const [edges, setEdges] = useState<Edge<any>[]>([]);
    const [nodes, setNodes] = useState<Node<{ label: string }>[]>(initialNodes);
    const [reactFlowInstance, setReactFlowInstace] = useState<ReactFlowInstance | null>(null);
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [selectedEdges, setSelectedEdges] = useState([]);

    // Handles changes in the array of Nodes as well as the position of the Nodes.
    const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds: Node<{ label: string }>[]) => applyNodeChanges(changes, nds)), [setNodes]);

    // Handles changes in the array of edges.
    const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds: Edge<any>[]) => applyEdgeChanges(changes, eds)), [setEdges]);

    //Handles the connection between given Nodes by the edges.
    const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, style: { stroke: "rgba(43, 197, 197, 1)" } }, eds)), [setEdges]);

    const onChange = useCallback(({ nodes, edges }: { nodes: any, edges: any }) => {
        setSelectedNodes(nodes.map((nd: any) => nd.id));
        setSelectedEdges(edges.map((ed: any) => ed.id));
    }, []);


    let position: { x: number, y: number };

    let flowDragOverStyle = { backgroundColor: "rgba(50, 105, 168,0.3)" };
    let flowDragEndStyle = { backgroundColor: "white" };

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDragEnter = () => {
        setOver("over");
    }


    const onDrop = useCallback((event: any) => {
        event.preventDefault();
        const type = event.dataTransfer.getData("application/node");
        setOver(null);

        if (typeof type === "undefined" || !type) {
            return;
        }

        if (reactFlowInstance) {
            position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

        } else {
            return;
        }

        const newNode = {
            id: getId(),
            type,
            position,
            data: { label: "message" }
        };

        setNodes((nds) => nds.concat(newNode));

    }, [reactFlowInstance]);

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
                    onDrop={onDrop}

                    onSelectionChange={onChange}
                    onDragOver={onDragOver}
                    onDragEnter={onDragEnter}
                    fitView
                    style={over ? flowDragOverStyle : flowDragEndStyle}

                >
                    <Controls />
                    <MiniMap />
                    {nodes.length > 0 ? "" : <EmptyMsg />}
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    )
}
