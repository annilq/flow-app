import { makeAutoObservable, makeObservable, observable, computed } from "mobx";
import { addBranch, addNodeAfter } from "./util";

class FlowStore {
  lists: Flow.node[];
  constructor(lists) {
    makeAutoObservable(this);
    this.lists = lists;
  }
  addBranch = addBranch;
  addNodeAfter = addNodeAfter;
}
class FlowItem {
  constructor(node: Flow.node) {
    makeObservable(this);
    Object.assign(this, node);
  }
}
export default FlowStore;
