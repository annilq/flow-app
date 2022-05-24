/*
    start -> task?->condition?(children:[])-> task[]? -> end
*/

export function getuid() {
  const tempUrl = URL.createObjectURL(new Blob());
  const uuid = tempUrl.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
  const arr = uuid.split("/");
  return arr[arr.length - 1];
}

function getStartNode(): Flow.node {
  const newNode: Flow.node = {
    id: getuid(),
    type: "START",
    parentKeys: [],
  };
  return newNode;
}

function getEndNode(): Flow.node {
  const newNode: Flow.node = {
    id: getuid(),
    type: "END",
    parentKeys: [],
  };
  return newNode;
}

function getTaskNode(parentNode: Flow.node): Flow.node {
  const parentKeys = [...(parentNode?.parentKeys || [])];
  if (parentNode?.id) {
    parentKeys.push(parentNode?.id);
  }
  const newNode: Flow.node = {
    id: getuid(),
    type: "USERTASK",
    parentKeys,
  };
  return newNode;
}

function getConditionNode(parentNode: Flow.node): Flow.node {
  const parentKeys = [...(parentNode?.parentKeys || [])];
  if (parentNode?.id) {
    parentKeys.push(parentNode?.id);
  }
  const newNode: Flow.node = {
    id: getuid(),
    type: "CONDITION",
    parentKeys,
  };
  newNode.children = [getBranchNode(newNode), getBranchNode(newNode)];
  return newNode;
}

function getBranchNode(parentNode: Flow.node): Flow.node {
  const parentKeys = [...(parentNode?.parentKeys || [])];
  const newNode: Flow.node = {
    id: getuid(),
    type: "BRANCH",
    children: [],
    parentKeys: [...parentKeys, parentNode.id],
  };
  return newNode;
}

function isBranchRoot(node: Flow.node): boolean {
  return node.type === "BRANCH";
}

function addBranchRoot(node: Flow.node, parent: Flow.node) {
  // parent.children.unshift(node);
  // parent.children = [node, ...parent.children];
  parent.children.splice(0, 0, node);
}

function findParentNode(parentKeys: string[], nodes: Flow.node[]): Flow.node {
  const tempkeys = [...(parentKeys || [])];

  let tempNode: any = nodes;
  let root = null;
  function iterNodes() {
    let parentKey = tempkeys.shift();
    while (parentKey && tempNode) {
      root = tempNode?.find((item) => item.id === parentKey);
      parentKey = tempkeys.shift();
      tempNode = root?.children;
    }
  }
  iterNodes();
  return root;
}
export function initFlowChart() {
  return [getStartNode(), getStartNode()];
}

export function addNodeAfter(
  nodeType: Flow.NodeType,
  node: Flow.node,
  nodes: Flow.node[]
): Flow.node[] {
  let newNode = null;
  let parent = findParentNode(node.parentKeys, nodes);
  if (node.type === "BRANCH") {
    parent = node;
  }

  switch (nodeType) {
    case "USERTASK":
      newNode = getTaskNode(parent);
      break;
    case "CONDITION":
      newNode = getConditionNode(parent);
      break;
    default:
      break;
  }
  // 如果点击的是分支节点则直接追加到分支第一个
  if (isBranchRoot(node)) {
    addBranchRoot(newNode, node);
  } else {
    // 存在父节点
    if (parent) {
      insertNodeAfter(newNode, node, parent.children);
    } else {
      insertNodeAfter(newNode, node, nodes);
    }
  }
  return [...nodes];
}

export function addBranch(node: Flow.node, nodes) {
  const newNode = getBranchNode(node);

  // 新增的节点插入到最后面
  node.children.push(newNode);
}

function insertNodeAfter(
  node: Flow.node,
  afterNode: Flow.node,
  nodes: Flow.node[]
) {
  const index = nodes.findIndex((node) => node.id === afterNode.id);
  if (index > -1) {
    nodes.splice(index + 1, 0, node);
  }
}

export function removeNode(node: Flow.node, nodes: Flow.node[]) {
  const parent = findParentNode(node.parentKeys, nodes);
  if (parent) {
    // 如果删掉的是分支，并且只有两个分支，则要将整个条件分支删除掉
    if (parent.children?.length === 2 && node.type === "BRANCH") {
      removeNode(parent, nodes);
    } else {
      const index = parent.children?.findIndex((item) => item.id === node.id);
      parent.children?.splice(index, 1);
    }
  } else {
    const index = nodes?.findIndex((item) => item.id === node.id);
    nodes?.splice(index, 1);
  }
}

function updateNode(node: Flow.node, nodes: Flow.node[]): Flow.node[] {
  // if(node?.parentKeys)
  return nodes;
}
