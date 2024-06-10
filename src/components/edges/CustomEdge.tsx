import { BaseEdge, getSimpleBezierPath, EdgeProps } from "reactflow";

export default function CustomEdge({ id, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition }: EdgeProps) {
    const [edgePath] = getSimpleBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    });


    return (
        <>
            <BaseEdge id={id} path={edgePath} />
        </>
    )
}