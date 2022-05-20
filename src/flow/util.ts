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

function getTaskNode(): Flow.node {
  const newNode: Flow.node = {
    id: getuid(),
    type: "USERTASK",
    parentKeys: [],
  };
  return newNode;
}

function getConditionNode(parentNode: Flow.node): Flow.node {
  const parentKeys = parentNode?.parentKeys || [];
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
  const parentKeys = parentNode.parentKeys || [];
  const newNode: Flow.node = {
    id: getuid(),
    type: "BRANCH",
    children: [],
    parentKeys: [...parentKeys, parentNode.id],
  };
  return newNode;
}

export function addCondition(node: Flow.node, nodes: Flow.node[]): Flow.node[] {
  const newNode = getConditionNode(node);
  if (isBranchRoot(node)) {
    addBranchRoot(node, newNode);
  } else {
    newNode.parentKeys = [...node.parentKeys];
    const parent = findSameLevelNodes(node, nodes);
    insertNodeAfter(newNode, node, parent);
  }
  newNode.children.forEach(
    (item) => (item.parentKeys = [...newNode.parentKeys, newNode.id])
  );
  return [...nodes];
}

function addBranchRoot(node: Flow.node, parent: Flow.node) {
  parent.children.unshift(node);
}
export function addBranch(node: Flow.node, nodes: Flow.node[]): Flow.node[] {
  const newNode = getBranchNode(node);
  // 新增的节点插入到最后面
  node.children.push(newNode);
  return [...nodes];
}

export function addTaskAfter(node: Flow.node, nodes: Flow.node[]): Flow.node[] {
  const newNode = getTaskNode();
  // 如果点击的是分支节点则直接追加到分支第一个
  if (isBranchRoot(node)) {
    addBranchRoot(node, newNode);
  } else {
    newNode.parentKeys = [...node.parentKeys];
    const parent = findSameLevelNodes(node, nodes);
    insertNodeAfter(newNode, node, parent);
  }
  return [...nodes];
}

function isBranchRoot(node: Flow.node): boolean {
  return node.type === "BRANCH";
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

function removeNode(newNode: Flow.node, nodes: Flow.node[]): Flow.node[] {
  return nodes;
}

function updateNode(node: Flow.node, nodes: Flow.node[]): Flow.node[] {
  // if(node?.parentKeys)
  return nodes;
}
function findSameLevelNodes(node: Flow.node, nodes: Flow.node[]): Flow.node[] {
  const parentKeys = [...node.parentKeys];
  // {
  //   id: "branch1",
  //   type: "BRANCH",
  //   title: "branch1",
  //   children: [
  //     {
  //       id: "task1",
  //       type: "USERTASK",
  //       title: "task",
  //       parentKeys: ["condition1", "branch1"],
  //     },
  //   ],
  //   parentKeys: ["condition1"],
  // },
  let tempNode: any = nodes;

  function iterNodes() {
    let parentKey = parentKeys.shift();
    while (parentKey) {
      const root = tempNode?.find((node) => node.id === parentKey);
      parentKey = parentKeys.shift();
      tempNode = root.children;
    }
  }
  iterNodes();
  return tempNode;
}
