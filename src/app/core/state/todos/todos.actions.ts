import {Todo} from "../../models/todo.model";

export namespace TodoActions {
  export class Add {
    static readonly type = '[Todo] Add';

    constructor(public payload: Todo) {
    }
  }

  export class SetCurrentTodos {
    static readonly type = '[Todo] Set';

    constructor(public payload: Todo[]) {
    }
  }

  export class Edit {
    static readonly type = '[Todo] Edit';

    constructor(public payload: Todo) {
    }
  }

  export class Complete {
    static readonly type = '[Todo] Complete';

    constructor(public payload: Todo) {
    }
  }

  export class FetchAll {
    static readonly type = '[Todo] Fetch All';
  }

  export class Delete {
    static readonly type = '[Todo] Delete';

    constructor(public id: string) {
    }
  }
}
