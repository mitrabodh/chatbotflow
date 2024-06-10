import React, { useEffect, useRef, useMemo, SetStateAction } from 'react'
import { useCallback, useState } from 'react'
import ReactFlow, { useReactFlow, Connection, Edge, EdgeChange, Node, NodeChange, addEdge, applyEdgeChanges, applyNodeChanges, MiniMap, Controls, ReactFlowProvider, ReactFlowInstance, XYPosition, Background, MarkerType } from 'reactflow'
import "reactflow/dist/style.css"
import styles from "./Flow.module.css"
import EmptyMsg from '../emptyMsg/EmptyMsg'
import SendMessageNode from '../nodes/SendMessageNode'
import CustomEdge from '../edges/CustomEdge'
import "../nodes/Custom.css"


const initialNodes: Node[] = [];

let id = 0;

const getId = () => `node-${id++}`;

const nodeTypes = { sendMsg: SendMessageNode };
const edgeTypes = { customEdge: CustomEdge }


export default function Canvas({ onDragEnd, over, setOver, setSelectedNodes }: { onDragEnd: any, over: string | null, setOver: any, setSelectedNodes: any }) {


    const reactFlowWrapper = useRef(null);
    const [edges, setEdges] = useState<Edge<any>[]>([]);
    const [nodes, setNodes] = useState<Node<{ label: string }>[]>(initialNodes);
    const [reactFlowInstance, setReactFlowInstace] = useState<ReactFlowInstance | null>(null);

    const [selectedEdges, setSelectedEdges] = useState([]);

    // A handle to manage changes in the array of Nodes as well as the position of the Nodes.
    const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds: Node<{ label: string }>[]) => applyNodeChanges(changes, nds)), [setNodes]);

    //A handle to manage changes in the array of edges.
    const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds: Edge<any>[]) => applyEdgeChanges(changes, eds)), [setEdges]);


    //A handle to manage the connection between given Nodes by the edges.
    const onConnect = useCallback((connection: Edge | Connection) => {
        const edge = { ...connection, markerEnd: { type: MarkerType.ArrowClosed, width: 15, height: 15, color: "rgba(50, 65, 229, 0.84)" } };
        setEdges((eds) => addEdge(edge, eds));
    }, [setEdges])


    //A handle to manage the selection of edges and nodes.
    const onChange = useCallback(({ nodes, edges }: { nodes: any, edges: any }) => {
        setSelectedNodes(nodes.map((nd: any) => nd.id));
        setSelectedEdges(edges.map((ed: any) => ed.id));
    }, []);

    let position: { x: number, y: number };


    let flowDragOverStyle = { backgroundColor: "rgba(50, 105, 168,0.3)" };// reactFlow canvas background color changes as we drag a node icon over the canvas.


    let flowDragEndStyle = { backgroundColor: "white" };// reactFlow canvas background color turns normal as the drag event ends or a custom node is dropped on the canvas.

    //A handle for drag over event.
    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    //A handle for drag end event.
    const onDragEnter = () => {
        setOver("over");
    }

    //A handle for drop event.
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


    //Deletes an edge on double click.
    const onEdgeDoubleClick = (_: any, edge: Edge) => {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    //Deletes a node on double click.
    const onNodeDoubleClick = (_: any, node: Node) => {
        setNodes((nds) => nds.filter((e) => e.id !== node.id));
    }


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
    )
}
