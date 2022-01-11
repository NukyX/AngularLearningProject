import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Todo} from "../../models/todo.model";

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() {
  }

  createDb() {
    const todos: Todo[] = [];
    const completedTodos: Todo[] = []
    return {todos, completedTodos}
  }
}
