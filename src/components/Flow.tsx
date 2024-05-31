import React from 'react'
import { useCallback, useState } from 'react'
import ReactFlow, { Connection, Edge, EdgeChange, Node, NodeChange, addEdge, applyEdgeChanges, applyNodeChanges, MiniMap, Controls, ReactFlowProvider } from 'reactflow'
import SendMessageNode from './nodes/SendMessageNode'
import "reactflow/dist/style.css"


const initialNodes = [{ id: "node-1", type: "sendMsg", position: { x: 0, y: 0 }, data: { label: "message" } }];

const nodeTypes = { sendMsg: SendMessageNode };

export default function Flow() {
    const [nodes, setNodes] = useState<Node<{ label: string }>[]>(initialNodes);
    const [edges, setEdges] = useState<Edge<any>[]>([]);

    // Handles changes in the array of Nodes.
    const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds: Node<{ label: string }>[]) => applyNodeChanges(changes, nds)), [setNodes]);

    // Handles changes in the array of edges.
    const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds: Edge<any>[]) => applyEdgeChanges(changes, eds)), [setEdges]);

    //Handles the connection between given Nodes by the edges.
    const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges])
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView />
                <Controls />
                <MiniMap />
            </ReactFlowProvider>
        </div>
    )
}
