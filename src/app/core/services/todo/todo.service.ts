import {Injectable} from '@angular/core';

import {Todo} from "../../models/todo.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Store} from "@ngxs/store";
import {TodoActions} from "../../state/todos/todos.actions";


@Injectable({
  providedIn: 'root'
})
export class TodoService {


  todosUrl: string = "/api/todos"
  completedTodosUrl: string = "/api/completedTodos"


  constructor(private http: HttpClient, private store: Store) {
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl);
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
