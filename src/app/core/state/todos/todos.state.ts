import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {TodoActions} from "./todos.actions";
import {TodoStateModel} from "../../models/todo-state.model";

@State<TodoStateModel>({
  name: 'TodosState',
  defaults: {
    currentTodos: [{
      id: "3231231231",
      priority: "Low",
      description: "Test"
    }],
    completedTodos: [{
      id: "3231231231",
      priority: "Low",
      description: "Test1"
    }]
  }
})
@Injectable()
export class TodosState {
  @Selector()
  static currentTodos(state: TodoStateModel) {
    return state.currentTodos
  }

  @Action(TodoActions.Add)
  addTodo(ctx: StateContext<TodoStateModel>, action: TodoActions.Add) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentTodos: [
        ...state.currentTodos,
        action.payload
      ]
    })
  }

  @Action(TodoActions.Delete)
  deleteTodo(ctx: StateContext<TodoStateModel>, action: TodoActions.Delete) {
    const state = ctx.getState();
    let tmpCurrentTodos = state.currentTodos.filter(todo => todo.id != action.id)
    ctx.setState(
      {
        ...state,
        currentTodos: [
          ...tmpCurrentTodos,
        ]
      }
    )
  }

  @Action(TodoActions.Complete)
  completeTodo(ctx: StateContext<TodoStateModel>, action: TodoActions.Complete) {
    const state = ctx.getState();
    let tmpCurrentTodos = state.currentTodos.filter(todo => todo.id != action.payload.id)
    ctx.setState({
      ...state,
      currentTodos: [...tmpCurrentTodos],
      completedTodos: [...state.completedTodos, action.payload]
    })
  }

}
