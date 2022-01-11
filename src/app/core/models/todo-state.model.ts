import {Todo} from "./todo.model";

export interface TodoStateModel {
  currentTodos: Todo[],
  completedTodos: Todo[]
}
