import { useContext } from "react";

import { Card } from "antd";
import HLine from "./HLine";
import FlowContext from "./flowContext";

interface Props {
  data: Flow.node;
}

function Start({ data }: Props) {
  const { onClickNode } = useContext(FlowContext);

  return (
    <div className="start flow-node">
      <Card className="card" onClick={() => onClickNode(data)}>
        start
      </Card>
      <HLine data={data} />
    </div>
  );
}

export default Start;
