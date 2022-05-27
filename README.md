### `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 节点数据类型
```typescript
enum NodeType {
  START,
  USERTASK,
  CONDITION,
  BRANCH,
  END,
}
declare namespace Flow {
  type NodeType = keyof typeof NodeType;

  type node = {
    id: string;
    type: NodeType;
    title?: string;
    next?: node;
    children?: node[];
    parentKeys?: string[];
  };
}
```
### 流程图展示
 ```javascript
<Start />
<Condition>
    <Branch data={nodes[1]}>
        <UserTask data={nodes[2]} />
    </Branch>
    <Branch data={nodes[7]}>
        <UserTask data={nodes[2]} />
    </Branch>
    <Branch data={nodes[4]}>
        <Condition data={[nodes[5], nodes[6]]} >
            <Branch data={nodes[5]} />
            <Branch data={nodes[6]}>
              <UserTask data={nodes[2]} />
            </Branch>
        </Condition>
    </Branch>
</Condition>
<UserTask data={nodes[2]} />
<End data={nodes[3]} />
```

### 注意事项
1. Condition组件下面只能接 Branch 组件
