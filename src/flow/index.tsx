import { useContext } from "react";

import FlowContext from "./flowContext";
import Start from "./start";
import End from "./end";
import Condition from "./condition";
import UserTask from "./usertask";
import Branch from "./branch";

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

  function getFlowNode(node: Flow.node) {

    let FlowNode = null;
    switch (node.type) {
      case "START":
        FlowNode = <Start data={node} key={node.id} />;
        break;
      case "BRANCH":
        FlowNode = (
          <Branch key={node.id} data={node}>
            {node.children?.map(getFlowNode)}
          </Branch>
        );
        break;
      case "CONDITION":
        FlowNode = (
          <Condition key={node.id} data={node}>
            {node.children?.map(getFlowNode)}
          </Condition>
        );
        break;
      case "USERTASK":
        FlowNode = <UserTask key={node.id} data={node} />;
        break;
      case "END":
        FlowNode = <End key={node.id} data={node} />;
        break;
      default:
        break;
    }

    return FlowNode;
  }
  const flowNodes = nodes.map(getFlowNode);

  return (
    <FlowContext.Provider value={events}>
      <div className="flow-chart">{flowNodes}</div>
    </FlowContext.Provider>
  );
}

export default Flow;
