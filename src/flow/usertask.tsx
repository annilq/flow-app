import { useContext } from "react";

import { Card } from "antd";
import HLine from "./HLine";
import FlowContext from "./flowContext";

interface Props {
  data: Flow.node;
}

function UserTask({ data }: Props) {
  const { onNodeClick } = useContext(FlowContext);

  return (
    <div
      className="usertask flow-node"
      style={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      <Card
        title="task title"
        extra={"remove"}
        className="card"
        onClick={() => onNodeClick(data)}
      >
        task
      </Card>
      <HLine data={data} />
    </div>
  );
}
export default UserTask;
