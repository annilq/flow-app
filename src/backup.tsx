import { useState, useEffect } from "react";
import { observer, Observer, useLocalObservable } from "mobx-react-lite";
import { autorun, makeAutoObservable, reaction, toJS } from "mobx";

import { Button, Modal } from "antd";
import Flow from "./flow";
import initdata from "./flow/flowdata";
import { addBranch, removeNode, addNodeAfter } from "./flow/util";

// class flowNodesStore {
//   data = [];
//   addBranch(node) {
//     addBranch(node, this.data);
//   }
//   addNodeAfter(type, node) {
//     addNodeAfter(type, node, this.data);
//   }
//   removeNode(node) {
//     removeNode(node, this.data);
//   }
//   constructor() {
//     this.data = initdata;
//     makeAutoObservable(this);
//     autorun(() => console.log(this.data));
//   }
// }
// const flowStore = new flowNodesStore();

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
