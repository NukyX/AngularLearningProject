import {Component, OnInit} from '@angular/core';
import {Todo} from "../../core/models/todo.model";
import {TodoService} from "../../core/services/todo/todo.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";


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
    this.currentTodos$ = this.todoService.getTodosState().pipe();
  }

  ngOnInit(): void {
    this.todoService.getTodos()
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
