import { useState } from "react";
import { Button, Modal } from "antd";
import Flow from "./flow";
import initdata from "./flow/flowdata";
import { addBranch, addCondition,addTaskAfter } from "./flow/util";

function App() {
  const [data, setData] = useState(initdata);
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState<Flow.node>();
  return (
    <div className="App">
      <Flow
        nodes={data}
        events={{
          onAddBranch: (node) => {
            // console.log("addBranch", node);
            setNode(node);
            addBranch(node,data)
            // setVisible(true);
          },
          onAddNode: (node) => {
            // console.log("addNode", node);
            setNode(node);
            setVisible(true);
          },
          onNodeClick: (node) => {
            // console.log("onNodeClick", node);
            // setNode(node);
            // setVisible(true);
          },
          onRemoveNode: (node) => {
            // console.log("onRemoveNode", node);
            // setNode(node);
            // setVisible(true);
          },
        }}
      />
      <Modal visible={visible} onCancel={() => setVisible(false)}>
        <Button
          type="primary"
          onClick={() => {
            const newdata = addTaskAfter(node, data);
            console.log(newdata);
            
          }}
        >
          任务
        </Button>
        <Button
          type="primary"
          onClick={() => {
            const newdata = addCondition(node, data);
            console.log(newdata);

          }}
        >
          分支
        </Button>
      </Modal>
    </div>
  );
}

export default App;
