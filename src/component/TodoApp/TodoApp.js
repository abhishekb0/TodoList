import React, { Component } from 'react'
import "./TodoApp.css"

export class TodoApp extends Component {
  state={
    input: "",
    items: [],
    editingIndex: -1,
    editedValue: "", 
  }

  handleChange = (event) =>{
    this.setState({
      input: event.target.value
    })
  }

  storeItems = event =>{
    event.preventDefault()
    const { input } = this.state

    this.setState({
      items: [...this.state.items, input],
      input: ""
    })
  }

  deleteItem = key =>{
    const allItems = this.state.items
    allItems.splice(key, 1)

    this.setState({
      items: allItems
    })
  }

  editItem = key =>{
    this.setState({
      editingIndex: key,
      editedValue: this.state.items[key]
    });
  }

  saveEditedItem = () => {
    const { editingIndex, editedValue } = this.state;
    if (editedValue.trim() !== "") {
      const updatedItems = [...this.state.items];
      updatedItems[editingIndex] = editedValue;
      this.setState({
        items: updatedItems,
        editingIndex: -1, 
        editedValue: "", 
      });
    }
  }

  cancelEdit = () => {
    this.setState({
      editingIndex: -1, 
      editedValue: "",  
    });
  }

  render() {
    const { input, items, editingIndex, editedValue } = this.state
    return (
      <div className="todo-container">
        <form className='input-section' onSubmit={this.storeItems}>
        <h1>Todo App</h1>
        <input 
          type='text'
          value={input} 
          onChange={this.handleChange}
          placeholder='Enter Items..'
        />
        </form>
        <ul>
          {items.map((data, index) => (
            <li key={index}>
              {editingIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={editedValue}
                    onChange={(e) => this.setState({ editedValue: e.target.value })}
                  />
                  <button onClick={this.saveEditedItem}>Save</button>
                  <button onClick={this.cancelEdit}>Cancel</button>
                </div>
              ) : (
                <div className='todo'>
                  {data}{' '}
                  <div className='itag'>
                    <i className="fa-regular fa-pen-to-square" onClick={() => this.editItem(index)}></i> <i className="fa-solid fa-trash" onClick={() => this.deleteItem(index)}></i>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default TodoApp
