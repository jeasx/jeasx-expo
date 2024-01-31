import { computed, signal } from "@preact/signals";

const todos = signal([
  { text: "Write my first post", completed: true },
  { text: "Buy new groceries", completed: false },
  { text: "Walk the dog", completed: false },
]);

const completedCount = computed(() => {
  return todos.value.filter((todo) => todo.completed).length;
});

const newItem = signal("");

function addTodo() {
  if (newItem.value) {
    todos.value = [...todos.value, { text: newItem.value, completed: false }];
    newItem.value = "";
  }
}

function removeTodo(index) {
  todos.value.splice(index, 1);
  todos.value = [...todos.value];
}

export default function TodoList() {
  const onInput = (event) => (newItem.value = event.target.value);

  return (
    <div class="todos">
      <input type="text" value={newItem.value} onInput={onInput} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.value.map((todo, index) => {
          return (
            <li>
              <button onClick={() => removeTodo(index)}>❌</button>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onInput={() => {
                    todo.completed = !todo.completed;
                    todos.value = [...todos.value];
                  }}
                />
                {todo.completed ? <s>{todo.text}</s> : todo.text}
              </label>
            </li>
          );
        })}
      </ul>
      <p>Completed count: {completedCount.value}</p>
    </div>
  );
}
