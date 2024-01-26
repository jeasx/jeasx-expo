export default function Error({ message }) {
  return (
    Object.keys(message).length > 0 && (
      <div role="alert">
        {Object.keys(message).map((key) => (
          <div>{message[key]}</div>
        ))}
      </div>
    )
  );
}
