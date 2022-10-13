import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  
  private todos: Todo[] = [
   {id: 1, descripton: 'Piedra del Alma', done: false}, 
   {id: 2, descripton: 'Piedra del Tiempo', done: false}, 
   {id: 3, descripton: 'Piedra del Espacio', done: true} 
  ]


  create(createTodoDto: CreateTodoDto) {

    const todo = new Todo();
    todo.id = this.todos.length + 1;
    todo.descripton = createTodoDto.descripton;
    this.todos.push(todo);
    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find(todo => todo.id === id);
    if(!todo) throw new NotFoundException(`TODO with #${id} not found`);
    return todo;
    
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    
    const { done, descripton } = updateTodoDto;

    const todo = this.findOne(id);

    if(done !== undefined) todo.done = done;
    if(descripton) todo.descripton = descripton;

    this.todos = this.todos.map( dbTodo => {
      if(dbTodo.id === id) return todo;
      return todo;
    });

    return todo;

  }

  remove(id: number) {

    this.findOne(id);

    this.todos = this.todos.filter(todo => todo.id != id);

  }
}
