import { createContext } from "react";
const FlowEventContext = createContext({
  onAddBranch: (node: Flow.node) => {},
  onAddNode: (node: Flow.node) => {},
  onNodeClick: (node: Flow.node) => {},
});

export default FlowEventContext;
