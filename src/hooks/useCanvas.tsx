import React, { useEffect, useRef } from 'react';
import { useCallback, useState } from 'react';
import ReactFlow, { Connection, Edge, EdgeChange, Node, NodeChange, addEdge, applyEdgeChanges, applyNodeChanges, ReactFlowInstance, MarkerType, getConnectedEdges } from 'reactflow';
import useApp from '../context/AppContext';


export default function useCanvas(initialNodes: Node[], getId: any) {
    const reactFlowWrapper = useRef(null);
    const [edges, setEdges] = useState<Edge<any>[]>([]);
    const [nodes, setNodes] = useState<Node<{ label: string }>[]>(initialNodes);
    const [reactFlowInstance, setReactFlowInstace] = useState<ReactFlowInstance | null>(null);
    const [selectedEdges, setSelectedEdges] = useState<string[]>([]);

    // A handle to manage changes in the array of Nodes as well as the position of the Nodes.
    const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds: Node<{ label: string }>[]) => applyNodeChanges(changes, nds)), [setNodes]);

    //A handle to manage changes in the array of edges.
    const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds: Edge<any>[]) => applyEdgeChanges(changes, eds)), [setEdges]);


    //A handle to manage the connection between given Nodes by the edges.
    const onConnect = useCallback((connection: Edge | Connection) => {
        const edge = { ...connection, markerEnd: { type: MarkerType.ArrowClosed, width: 15, height: 15, color: "rgba(50, 65, 229, 0.84)" } };
        setEdges((eds) => addEdge(edge, eds));
    }, [setEdges]);


    //Getting necessary dispatch functions and variables from the useApp hook.
    const { selectedNodes, setSelectedNodes, text, over, setOver, setError } = useApp();


    //A handle to manage the selection of edges and nodes.
    const onChange = useCallback(({ nodes, edges }: { nodes: any, edges: any }) => {
        setSelectedNodes(nodes.map((node: Node) => node.id));
        setSelectedEdges(edges.map((edge: Edge) => edge.id));
    }, []);


    let position: { x: number, y: number };

    let flowDragOverStyle = { backgroundColor: "rgba(50, 105, 168,0.3)" };// ReactFlow canvas background color changes as we drag a node icon over the canvas.


    let flowDragEndStyle = { backgroundColor: "white" };// ReactFlow canvas background color turns normal as the drag event ends or a custom node is dropped on the reactFlow canvas.


    const onDragOver = useCallback((event: any) => {//A handle for drag over event.
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);


    const onDragEnter = () => {//A handle for drag end event.
        setOver("over");
    }


    const onDrop = useCallback((event: any) => {//A handle for drop event.
        event.preventDefault();
        const type = event.dataTransfer.getData("application/node");
        setOver("");

        //If the type of the node being dropped is undefined or the type itself is missing, the drop function returns without doing anything.
        if (typeof type === "undefined" || !type) {
            return;
        }

        //The screenToFlowPosition method of a reactFlowInstance transforms client coordinates to flow coordinates.
        if (reactFlowInstance) {
            position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

        } else {
            return;
        }

        //A new instance of the node is created and added to the array of current node instances.
        const newNode = {
            id: getId(),
            type,
            position,
            data: { label: `${text}` }
        };

        setNodes((nds) => nds.concat(newNode));

    }, [reactFlowInstance]);


    //Updates the text message on a node when the node is selected and the text in the textarea of settings panel changes.
    useEffect(() => {
        setNodes((nds) => {
            return nds.map((node: Node) => {
                if (selectedNodes.includes(node.id)) {
                    node.data = {
                        ...node.data,
                        label: text
                    };
                }
                return node;
            })
        });
    }, [text, setNodes]);



    const totalEdges = getConnectedEdges(nodes, edges);//The getconnectedEdges() function returns an array of current Edges.


    const targetNodes = totalEdges.map((e) => {
        //returns an array of the current nodes, where each node has a non-empty target handle.
        return e.target;
    });

    const setTargetNodes = new Set(targetNodes);//returns a set of unique nodes, where each node has a non-empty target handle.

    const uniqueTargetNodes = Array.from(setTargetNodes);//A set of unique nodes, where each node has a non-empty target handle is converted into an array of the same.

    //returns an array of the current nodes.
    const totalNodes = nodes.map(el => {
        return el.id;
    });

    useEffect(() => {

        if ((totalNodes.length > 1) && ((uniqueTargetNodes.length + 1) < (totalNodes.length))) {
            //Checks if one plus the number of current nodes each of which is having a non-empty target handle is less than the number of current nodes. If it's less that means more than one node is having an empty target handle; in that case, we set the value of 'error' as true to show an error message to the client.
            setError(true);

        } else if (totalNodes.length === 0) {
            //Shows an error message to the client if the client clicks on 'Save Changes' button without adding any node to the canvas.
            setError(true);
        } else {
            setError(false);
        }
    }, [nodes, setNodes, edges, setEdges]);



    //Deletes an edge on double click.
    const onEdgeDoubleClick = (_: any, edge: Edge) => {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    };

    //Deletes any edge associated to the target node to be deleted.
    const onNodeDoubleClick = (_: any, node: Node) => {
        totalEdges.map((ed) => {
            if (ed.target === node.id || ed.source === node.id) {
                setEdges((eds) => eds.filter((el) => el.id !== ed.id));
            }
        });

        //Deletes the target node.
        setNodes((nds) => nds.filter((e) => e.id !== node.id));
    }
    return { nodes, edges, onNodesChange, onEdgesChange, setReactFlowInstace, onConnect, onDrop, onChange, onDragOver, onDragEnter, onEdgeDoubleClick, onNodeDoubleClick, over, flowDragEndStyle, flowDragOverStyle, reactFlowWrapper }
}
