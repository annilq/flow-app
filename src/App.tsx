import { useState } from "react";
import { useImmerReducer } from "use-immer";

import { Button, Modal } from "antd";

import Flow from "./flow";
import initialState from "./flow/flowdata";
import { addBranch, removeNode, addNodeAfter } from "./flow/util";

type actionType = "ADD" | "DELETE" | "UPDATE";
type actionAddNode = { nodeType: Flow.NodeType; node: Flow.node };

function reducer(
  draft,
  action: {
    type: actionType;
    payload: actionAddNode | Flow.node;
  }
) {
  switch (action.type) {
    case "ADD":
      const { nodeType, node } = action.payload as actionAddNode;
      switch (nodeType) {
        case "BRANCH":
          addBranch(node, draft);
          break;
        case "CONDITION":
        case "USERTASK":
          addNodeAfter(nodeType, node, draft);
          break;
        default:
          break;
      }
      break;
    case "UPDATE":
      break;
    case "DELETE":
      removeNode(action.payload as Flow.node, draft);
      break;
  }
}
function App() {
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState<Flow.node>();
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <div className="App">
      <Flow
        nodes={state}
        events={{
          onAddBranch: (node) => {
            dispatch({ type: "ADD", payload: { nodeType: "BRANCH", node } });
          },

          onAddNode: (node) => {
            setNode(node);
            setVisible(true);
          },

          onClickNode: (node) => {
            // console.log("onClickNode", node);
            // setNode(node);
            // setVisible(true);
            // dispatch({ type: "addBranch" });
          },
          onRemoveNode: (node) => {
            console.log("removeNode", node);
            dispatch({ type: "DELETE", payload: node });
          },
        }}
      />
      <Modal visible={visible} onCancel={() => setVisible(false)}>
        <Button
          type="primary"
          onClick={() => {
            dispatch({ type: "ADD", payload: { nodeType: "USERTASK", node } });
          }}
        >
          任务
        </Button>
        <Button
          type="primary"
          onClick={() => {
            dispatch({ type: "ADD", payload: { nodeType: "CONDITION", node } });
          }}
        >
          分支
        </Button>
      </Modal>
    </div>
  );
}

export default App;
