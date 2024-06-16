# A chatbot flow builder

A chatbot flow is built by connecting multiple messages together to decide the order of execution. 
Note: As of now, the drag and drop functionality of the app only works on a laptop or a desktop and does not work on mobile (touch) devices.


## Features:
1. ### Text Node

    a. Our flow builder currently supports only one type of message (i.e. Text Message).

    b. There can be multiple text nodes in one flow.

    c. Nodes are added to the flow by dragging and dropping a Node from the Nodes Panel.


2. ### Nodes Panel

    a. This panel houses all kind of Nodes that our flow builder supports.

    b. Right now there is only Message Node, but we'd be adding more types of Nodes in the future.

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
   
### The secondary branch implements redux-toolkit whereas the main branch uses Context-API with useReducer to manage the states. In my opinion, the use of Context-API with useReducer is a better choice for this app.
