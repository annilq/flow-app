import { createContext } from "react";
const FlowEventContext = createContext({
  onAddBranch: (node: Flow.node) => {},
  onAddNode: (node: Flow.node) => {},
  onClickNode: (node: Flow.node) => {},
  onRemoveNode: (node: Flow.node) => {},
});

export default FlowEventContext;
