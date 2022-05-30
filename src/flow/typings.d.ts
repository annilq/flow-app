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
    children?: node[];
    parentKeys?: string[];
  };
}
