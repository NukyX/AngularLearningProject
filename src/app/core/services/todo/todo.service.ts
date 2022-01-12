import {Injectable} from '@angular/core';

import {Todo} from "../../models/todo.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Store} from "@ngxs/store";
import {TodoActions} from "../../state/todos/todos.actions";
import {TodosState} from "../../state/todos/todos.state";


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  currentTodoState: Observable<Todo[]>
  todosUrl: string = "/api/todos"
  completedTodosUrl: string = "/api/completedTodos"


  constructor(private http: HttpClient, private store: Store) {
    this.currentTodoState = this.store.select(TodosState.currentTodos)

  }

  getTodosState(): Observable<Todo[]> {
    return this.currentTodoState
  }

  getTodos(): void {
    this.http.get<Todo[]>(this.todosUrl).subscribe((todos) => this.store.dispatch(new TodoActions.SetCurrentTodos(todos)))
  }

  addTodo(todoDescription: string, todoPriority: string) {
    this.http.post<Todo>(this.todosUrl, {
      id: Math.random().toString(36).substring(2, 9),
      description: todoDescription,
      priority: todoPriority
    }).subscribe((res) => this.store.dispatch(new TodoActions.Add(res)))

  }

  async deleteTodo(todo: Todo) {
    await this.http.delete<Todo>(this.todosUrl + "/" + todo.id)
    this.store.dispatch(new TodoActions.Delete(todo.id))
  }

  async completeTodo(todo: Todo) {
    await this.http.post(this.completedTodosUrl, todo)
    await this.deleteTodo(todo)
    this.store.dispatch(new TodoActions.Complete(todo))

  }


}
