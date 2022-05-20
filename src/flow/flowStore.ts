import { makeAutoObservable,makeObservable, observable, computed } from "mobx"

class FlowStore {
    lists:Flow.node[]
    constructor(lists) {
        makeObservable(this, {
            lists: observable
        })
        this.lists = lists
    }
}

export default FlowStore