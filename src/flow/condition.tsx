// 每个 condition 包含多个 branch 分支,并且包含一个新增branch按钮
import { useContext } from "react";

import { PlusCircleOutlined } from "@ant-design/icons";
import HLine from "./HLine";
import FlowContext from "./flowContext";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

interface Props {
  data: Flow.node;
  children?: any;
}
function Condition({ data, children }: Props) {
  const { onAddBranch } = useContext(FlowContext);

  return (
    <div className="condition">
      <PlusCircleOutlined
        style={{ color: "red", marginBottom: -7, zIndex: 99 }}
        onClick={() => onAddBranch(data)}
      />
      <div className="branch-nodes">{children}</div>
      <HLine data={data} />
    </div>
  );
}
const MobxObserver = observer(({ data, children = false }:any) => (
  <Condition data={toJS(data)}>{children}</Condition>
));
export default MobxObserver;
