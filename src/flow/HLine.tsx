import { useContext } from "react";

import { PlusCircleOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import FlowContext from "./flowContext";

interface Props {
  data: Flow.node;
}
function HLine({ data }: Props) {
  const { onAddNode } = useContext(FlowContext);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        minHeight: 100,
        flex: 1,
      }}
    >
      <Divider
        type="vertical"
        style={{ position: "absolute", height: "100%", padding: 0 }}
      />
      <PlusCircleOutlined
        style={{ position: "absolute", top: 50 }}
        onClick={() => onAddNode(data)}
      />
    </div>
  );
}
export default HLine;
