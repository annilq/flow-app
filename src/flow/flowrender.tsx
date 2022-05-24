import { observer } from "mobx-react-lite";
import Start from "./start";
import End from "./end";
import Condition from "./condition";
import UserTask from "./usertask";
import Branch from "./branch";

function FLowNodeRender({
  node,
  children = false,
}: {
  node: Flow.node;
  children: any;
}) {
  let FlowNode = null;
  switch (node.type) {
    case "START":
      FlowNode = (
        <Start
          data={node}
          key={node.id}
        />
      );
      break;
    case "BRANCH":
      FlowNode = (
        <Branch
          key={node.id}
          data={node}
        >
          {node.children?.map((node) => (
            <FLowNodeRender
              node={node}
              key={node.id}
            >
              {children}
            </FLowNodeRender>
          ))}
        </Branch>
      );
      break;
    case "CONDITION":
      FlowNode = (
        <Condition
          key={node.id}
          data={node}
        >
          {node.children?.map((node) => (
            <FLowNodeRender
              node={node}
              key={node.id}
            >
              {children}
            </FLowNodeRender>
          ))}
        </Condition>
      );
      break;
    case "USERTASK":
      FlowNode = (
        <UserTask
          key={node.id}
          data={node}
        />
      );
      break;
    case "END":
      FlowNode = (
        <End
          key={node.id}
          data={node}
        />
      );
      break;
    default:
      break;
  }

  return <>{FlowNode}</>;
}
const MobxObserver = observer(({ node, children = false }: any) => (
  //   <FLowNodeRender node={toJS(node)}>{children}</FLowNodeRender>
  <FLowNodeRender
    node={{
      id: node.id,
      type: node.type,
      title: node.title,
      children: node.children,
      parentKeys: node.parentKeys,
    }}
  >
    {children}
  </FLowNodeRender>
));
export default MobxObserver;
// function getFLowNode(node: Flow.node) {
//     let FlowNode = null;
//     switch (node.type) {
//       case "START":
//         FlowNode = <Start data={node} key={node.id} />;
//         break;
//       case "BRANCH":
//         FlowNode = (
//           <Branch key={node.id} data={node}>
//             {node.children?.map(getFLowNode)}
//           </Branch>
//         );
//         break;
//       case "CONDITION":
//         FlowNode = (
//           <Condition key={node.id} data={node}>
//             {node.children?.map(getFLowNode)}
//           </Condition>
//         );
//         break;
//       case "USERTASK":
//         FlowNode = <UserTask key={node.id} data={node} />;
//         break;
//       case "END":
//         FlowNode = <End key={node.id} data={node} />;
//         break;
//       default:
//         break;
//     }
  
//     return FlowNode;
//   }