import { makeAutoObservable } from "mobx";
import * as utils from "./util";
import { addBranch, removeNode, addNodeAfter } from "./util";

class FlowStore {
  data: Flow.node[] = [];
  constructor(data) {
    // Object.assign(this, utils);
    this.data = data?.map((item) => new FlowModel(item));

    // this.data = data
    makeAutoObservable(this);
  }
  addBranch = (node) => {
    addBranch(node, this.data);
  };
  removeNode = (node) => {
    removeNode(node, this.data);
  };
  addNodeAfter = (type, node) => {
    addNodeAfter(type, node, this.data);
  };
}

class FlowModel {
  store = null;
  children: any = [];
  id = "";
  type = "";
  title = "";
  constructor(model) {
    Object.assign(this, model);
    if (model?.children?.length) {
      this.store = new FlowStore(model?.children);
    }
    makeAutoObservable(this);
  }
}

export default FlowStore;
