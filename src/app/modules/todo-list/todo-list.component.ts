import {Component, OnInit} from '@angular/core';
import {Todo} from "../../core/models/todo.model";
import {TodoService} from "../../core/services/todo/todo.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {TodosState} from "../../core/state/todos/todos.state";


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  currentTodos$: Observable<Todo[]>

  newTodoFrom = new FormGroup({
    todoDescription: new FormControl('', [Validators.required]),
    todoPriority: new FormControl('Low', [Validators.required]),
  });


  constructor(private todoService: TodoService, private store: Store) {
    this.currentTodos$ = this.store.select(TodosState.currentTodos)
  }

  ngOnInit(): void {
    //this.store.dispatch(new TodoActions.Add({id: "Please work", description: "Test", priority: "Low"}))
  }

  addTodo(): void {
    this.todoService.addTodo(this.newTodoFrom.value.todoDescription, this.newTodoFrom.value.todoPriority);
    this.newTodoFrom.patchValue({
      todoDescription: "",
      todoPriority: "Low"
    })
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo)
  }

  completeTodo(todo: Todo): void {
    this.todoService.completeTodo(todo).then();
  }
}
