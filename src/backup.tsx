import { useState, useEffect } from "react";
import { observer, Observer, useLocalObservable } from "mobx-react-lite";
import { reaction, toJS } from "mobx";

import { Button, Modal } from "antd";
import Flow from "./flow";
import initdata from "./flow/flowdata";
import { addBranch, removeNode, addNodeAfter } from "./flow/util";

function App() {
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState<Flow.node>();

  const flowStore = useLocalObservable(() => ({
    data: initdata,
    addBranch(node) {
      addBranch(node, this.data);
    },
    addNodeAfter(type, node) {
      addNodeAfter(type, node, this.data);
    },
    removeNode(node) {
      removeNode(node, this.data);
    },
  }));

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

  return (
    <Observer>
      {() => (
        <div className="App">
          <Flow
            nodes={toJS(flowStore.data)}
            events={{
              onAddBranch: (node) => {
                // console.log("addBranch", node);
                // setNode(node);
                flowStore.addBranch(node);
                // setVisible(true);
              },
              onAddNode: (node) => {
                // console.log("addNode", node);
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
                // setNode(node);
                // setVisible(true);
              },
            }}
          />
          <Modal visible={visible} onCancel={() => setVisible(false)}>
            <Button
              type="primary"
              onClick={() => {
                const newdata = flowStore.addNodeAfter("USERTASK", node);
                console.log(newdata);
              }}
            >
              任务
            </Button>
            <Button
              type="primary"
              onClick={() => {
                const newdata = flowStore.addNodeAfter("CONDITION", node);
                console.log(newdata);
              }}
            >
              分支
            </Button>
          </Modal>
        </div>
      )}
    </Observer>
  );
}

export default observer(App);
