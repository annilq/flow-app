import { useState, useEffect } from "react";
import { isObservableObject, reaction, toJS } from "mobx";

import { Button, Modal } from "antd";
import Flow from "./flow";
import initdata from "./flow/flowdata";
import FlowStore from "./flow/flowStore";

// const flowStore = new FlowStore(initdata);

function App() {
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState<Flow.node>();
  const [flowStore] = useState<any>(() => new FlowStore(initdata));

  useEffect(
    () => {
      reaction(
        () => toJS(flowStore.data),
        (newVal) => {
          console.log(newVal);
        }
      );
    },
    [] // note empty dependencies
  );
  // console.log(flowStore);
  // console.log(isObservableObject(flowStore.data));

  return (
    <div className="App">
      <Flow
        // nodes={ flowStore.data}
        flowStore={flowStore}
        nodes={toJS(flowStore.data)}
        events={{
          onAddBranch: (node) => {
            flowStore.addBranch(node);
          },
          onAddNode: (node) => {
            setNode(node);
            setVisible(true);
          },
          onClickNode: (node) => {
            // console.log("onClickNode", node);
            // setNode(node);
            // setVisible(true);
          },
          onRemoveNode: (node) => {
            console.log("onRemoveNode", node);
            flowStore.removeNode(node);
          },
        }}
      />
      <Modal visible={visible} onCancel={() => setVisible(false)}>
        <Button
          type="primary"
          onClick={() => {
            flowStore.addNodeAfter("USERTASK", node);
          }}
        >
          任务
        </Button>
        <Button
          type="primary"
          onClick={() => {
            flowStore.addNodeAfter("CONDITION", node);
          }}
        >
          分支
        </Button>
      </Modal>
    </div>
  );
}

export default App;
