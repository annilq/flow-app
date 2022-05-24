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
      <div className="flow-chart">
        {/* <Start data={flowLinkData[0]} />
      <Condition data={[flowLinkData[1], flowLinkData[4]]} key={1}>
        <Branch key={flowLinkData[1].id} data={flowLinkData[1]}>
          <UserTask data={flowLinkData[2]} />
        </Branch>
        <Branch key={flowLinkData[7].id} data={flowLinkData[7]}>
          <UserTask data={flowLinkData[2]} />
        </Branch>
        <Branch key={flowLinkData[4].id} data={flowLinkData[4]}>
          <Condition data={[flowLinkData[5], flowLinkData[6]]} key={2}>
            <Branch key={flowLinkData[5].id} data={flowLinkData[5]} />
            <Branch key={flowLinkData[6].id} data={flowLinkData[6]}>
              <UserTask data={flowLinkData[2]} />
            </Branch>
          </Condition>
        </Branch>
      </Condition>
      <UserTask data={flowLinkData[2]} />
      <End data={flowLinkData[3]} /> */}
        {flowNodes}
      </div>
    </FlowContext.Provider>
  );
}

export default Flow;
