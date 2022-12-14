import { useState } from 'react';
import './App.css'

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updateTodos = todos.map((t) => t.id === editTodo.id
        ? (t = { id: t.id, todo })
        : { id: t.id, todo: t.todo }
      );
      setTodos(updateTodos);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== '') {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      console.log(todo);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo])
  }

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  }

  return (
    <div>
      <h1>ToDo List</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' className='box' value={todo} onChange={(e) => setTodo(e.target.value)} placeholder='Enter the message' />
        <button className='btn' type='submit'>{ editId ? "Edit" : "ADD" }</button>
      </form>
      <div>
        <ul>
          {todos.map((t) => (
            <li className="singleTodo">
              <span className="todoText" key={t.id}>
                {t.todo}
              </span>
              <button className='btn1' onClick={() => handleDelete(t.id)} >Delete</button>
              <button className='btn2' onClick={() => handleEdit(t.id)} >Edit</button>
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
}

export default App;