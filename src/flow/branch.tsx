// 每个branch都有个添加按钮
import { useContext } from "react";

import { Card } from "antd";
import HLine from "./HLine";
import HLine2 from "./HLine2";
import FlowContext from "./flowContext";

interface Props {
  data: Flow.node;
  children?: any;
}
function Branch({ data, children }: Props) {
  const { onNodeClick } = useContext(FlowContext);

  return (
    <div className="branch flow-node">
      <HLine2 />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          title="branch title"
          extra={"remove"}
          className="barach card"
          onClick={() => onNodeClick(data)}
        >
          {data?.title}
        </Card>
      </div>
      <HLine data={data} />
      {children}
    </div>
  );
}

export default Branch;
