export default function ({ autofocus }) {
  return (
    <form method="post">
      <input
        class="new-todo"
        name="newTodo"
        placeholder="What needs to be done?"
        autofocus={autofocus}
      />
    </form>
  );
}
