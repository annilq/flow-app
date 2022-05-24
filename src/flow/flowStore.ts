import { makeAutoObservable } from "mobx";
// import * as utils from "./util";

class FlowStore {
  lists: Flow.node[];
  constructor(lists) {
    // this.lists = lists;
    Object.assign(this, lists);
    makeAutoObservable(this);
  }
}
export default FlowStore;
