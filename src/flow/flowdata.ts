const data: Flow.node[] = [
  {
    id: "start",
    type: "START",
    title: "start",
    parentKeys:[],
    children:[]
  },
  {
    id: "condition1",
    type: "CONDITION",
    children: [
      {
        id: "branch1",
        type: "BRANCH",
        title: "branch1",
        children: [
          {
            id: "task1",
            type: "USERTASK",
            title: "task",
            parentKeys: ["condition1", "branch1"],
            children:[]
          },
        ],
        parentKeys: ["condition1"],
      },
      {
        id: "branch2",
        type: "BRANCH",
        title: "branch2",
        children: [
          {
            id: "task2",
            type: "USERTASK",
            title: "task",
            parentKeys: ["condition1", "branch2"],
            children:[]
          },
        ],
        parentKeys: ["condition1"],
      },
      {
        id: "branch3",
        type: "BRANCH",
        title: "branch3",
        parentKeys: ["condition1"],
        children: [
          {
            id: "condition2",
            type: "CONDITION",
            title: "condition2",
            children: [
              {
                id: "branch4",
                type: "BRANCH",
                title: "task",
                parentKeys: ["condition1", "branch3", "condition2"],
                children:[]
              },
              {
                id: "branch5",
                type: "BRANCH",
                title: "task",
                parentKeys: ["condition1", "branch3", "condition2"],
                children: [
                  {
                    id: "task3",
                    type: "USERTASK",
                    title: "task",
                    parentKeys: [
                      "condition1",
                      "branch3",
                      "condition2",
                      "branch5",
                    ],
                    children:[]
                  },
                ],
              },
            ],
            parentKeys: ["condition1", "branch3"],
          },
        ],
      },
    ],
    title: "condition1",
    parentKeys:[],
  },
  {
    id: "task4",
    type: "USERTASK",
    title: "task",
    parentKeys:[],
    children:[]
  },
  {
    id: "end",
    type: "END",
    title: "end",
    parentKeys:[],
    children:[]
  },
];
export default data;
