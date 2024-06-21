# A chatbot flow builder

A chatbot flow is built by connecting multiple messages together to decide the order of execution. 
#### Note: As of now, the drag and drop functionality of the app only works on a laptop or a desktop and does not work on mobile (touch) devices.

Link to the working version of the app: https://chatbotflow-sepia.vercel.app/

## Features:
1. ### Text Node

    a. Our flow builder currently supports only one type of message (i.e. Text Message).

    b. There can be multiple text nodes in one flow.

    c. Nodes are added to the flow by dragging and dropping a Node from the Nodes Panel.


2. ### Nodes Panel

    a. This panel houses all kind of Nodes that our flow builder supports.

    b. Right now there is only Message Node, but I'd be adding more types of Nodes in the future.

3. ### Edge

    a. Connects two Nodes together.

4. ### Source Handle

    a. Source of a connecting edge.

    b. It has only one edge originating from a source handle.

5. ### Target Handle

    a. Target of a connecting edge.

    b. More than one edge can be connected to the target handle.

6. ### Setting Panel

    a. Setting panel will replace the Node Panel when a Node is selected.

    b. It has a text field to edit text of the selected Text Node.

7. ### Save Button

    a. Button to save the flow.

    b. Save button press will show an error if there are more than one Nodes and more than one Node has empty target handles.

## Tech Stack:
    The chat bot flow builder app is built in typescript with the help of the react and reactFlow library. 
    In the 'main' branch of this repository the states of the application are shown to be managed by using the Context API coupled with the useReducer. 
    In the 'secondary' branch of the repository states are shown to be managed by the redux toolkit. 
    HTML drag and drop API was utilized to add the drag and drop functionality to the app. Modular CSS approach was adopted to style the components of the application.

## How to use the Application:
    1. Drag and Drop the text node icon from the side panel to the canvas. As soon as you drop the icon, the relevant node appears on the canvas. 
    2. You can drop more than one nodes on the canvas to connect them with each other. 
    3. The connection line between the nodes is called the edge. You can draw an edge from a source handle, which is attached to the right hand side of the every node, and connect that edge to the target handle, which is attached to the left hand side of the every node.
    4. To select a node or an edge just click on it.
    5. To delete an edge or a node just doubleclick on it.
    6. To edit the message on a node you just need to click on that node to open a settings panel from where you can edit the text message on the selected node/s.  
    7. If you click on the 'Save Changes' button, which is present on the top right corner of the app, it will either show a success message or an error message.
    8. If there are more than one nodes on the canvas and more than one nodes have an empty target handle, an error message will pop up after clicking on the 'Save Changes' button.

## About the code testing:
    I did not add test files to the codebase because the majority of the app is built with a third party library and therefore it might not be feasible to test many of its functionalities as they are handled internally by the third party library itself. 
