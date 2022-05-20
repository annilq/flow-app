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

  type edge = {
    id: string;
    source: string;
    target: string;
  };
}
