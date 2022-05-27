import { useContext } from "react";

import FlowContext from "./flowContext";
import FLowNodeRender from "./flowrender";

import "./index.css";

interface FlowProps {
  nodes: Flow.node[];
  events?: {
    onAddBranch: (node: Flow.node) => void;
    onAddNode: (node: Flow.node) => void;
    onClickNode: (node: Flow.node) => void;
    onRemoveNode: (node: Flow.node) => void;
  };
}

function Flow(flowProps: FlowProps) {
  const defalutEventsHandle = useContext(FlowContext);

  const { nodes, events = defalutEventsHandle } = flowProps;
  // console.log(isObservableObject(nodes));

  const flowNodes = nodes.map((node) => (
    <FLowNodeRender
      node={{
        id: node.id,
        type: node.type,
        title: node.title,
        children: node.children,
        parentKeys: node.parentKeys,
      }}
      key={`render-${node.id}`}
    />
  ));

  return (
    <FlowContext.Provider value={events}>
      <div className="flow-chart">{flowNodes}</div>
    </FlowContext.Provider>
  );
}

export default Flow;
