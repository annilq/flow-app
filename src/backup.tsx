import { useState, useEffect } from "react";
import { observer, Observer } from "mobx-react-lite";
import { observable, reaction, toJS, autorun } from "mobx";

import { Button, Modal } from "antd";
import Flow from "./flow";
import initdata from "./flow/flowdata";
import FlowStore from "./flow/flowStore";

function App() {
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState<Flow.node>();
  const [data] = useState(() => new FlowStore(initdata)); // See the Timer definition above.
  const { addBranch, addNodeAfter, lists } = data;

  useEffect(
    () => {
      reaction(
        () => toJS(data),
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
            nodes={data.lists}
            events={{
              onAddBranch: (node) => {
                // console.log("addBranch", node);
                setNode(node);
                addBranch(node, data.lists);
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
                const newdata = addNodeAfter("USERTASK", node, data.lists);
                console.log(newdata);
              }}
            >
              任务
            </Button>
            <Button
              type="primary"
              onClick={() => {
                const newdata = addNodeAfter("CONDITION", node, data.lists);
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
