import React from 'react'

export default props =>
  <form onSubmit={props.handleTodoSubmit}>
    <input
      type='text'
      autoFocus //autofocus puts focus on a specific element
      value={props.currentTodo} //value property on input
      onChange={props.handleNewToDoChange}
      className="new-todo"
      placeholder="What needs to be done?"/>
  </form>
