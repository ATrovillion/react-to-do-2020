// This is the root component. All other components in the app are descendents
import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { description: 'Walk the cat', isCompleted: true },
        { description: 'Throw the dishes away', isCompleted: false },
        { description: 'Buy new dishes', isCompleted: false }
      ],
      newTodoDescription: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newTodoDescription) { return }
    const newTodo = { description: this.state.newTodoDescription, isCompleted: false };
    this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' })
  }

  handleChange(e) {
    this.setState({ newTodoDescription: e.target.value })
  }

  deleteTodo(index) {
    //call this.setState() and pass new array that doesn't have the to-do item being deleted (maybe use filter()?)
    const newToDos = this.state.todos.slice(0, index).concat(this.state.todos.slice(index + 1, this.state.todos.length))
    console.log(newToDos)
    this.setState({ todos: newToDos })
  }

  toggleComplete(index) {
    const todos = this.state.todos.slice();
    const todo = todos[index];
    todo.isCompleted = todo.isCompleted ? false : true;
    this.setState({ todos: todos })
  }

  render() {
  return (
    <div className="App">
      <ul>
        { this.state.todos.map( (todo, index) =>
          <ToDo 
            key={ index }
            description={ todo.description }
            isCompleted={ todo.isCompleted }
            toggleComplete={ () => this.toggleComplete(index) }
            deleteTodo={ (itemForDeletion) => this.deleteTodo(index) }
            />
        )}
      </ul>
      <form onSubmit={ (e) => this.handleSubmit(e) }>
        <input type="text" value={ this.state.newTodoDescription } onChange={ (e) => this.handleChange(e) } />
        <input type="submit" />
      </form>
    </div>
  );
  }
}

export default App;
