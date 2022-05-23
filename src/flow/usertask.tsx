import { useContext } from "react";

import { Card, Button } from "antd";
import HLine from "./HLine";
import FlowContext from "./flowContext";

interface Props {
  data: Flow.node;
}

function UserTask({ data }: Props) {
  const { onClickNode, onRemoveNode } = useContext(FlowContext);

  return (
    <div
      className="usertask flow-node"
      style={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      <Card
        title="task title"
        extra={<Button danger onClick={() => onRemoveNode(data)}>remove</Button>}
        className="card"
        onClick={() => onClickNode(data)}
      >
        task
      </Card>
      <HLine data={data} />
    </div>
  );
}
export default UserTask;
