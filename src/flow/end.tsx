// 每个branch确保有个条件以及 添加新一步的按钮
import { useContext } from "react";
import FlowContext from "./flowContext";

interface Props {
  data: Flow.node;
}

function End({ data }: Props) {
  const { onNodeClick } = useContext(FlowContext);

  return (
    <div className="end flow-node" onClick={() => onNodeClick(data)}>
      end
    </div>
  );
}

export default End;
