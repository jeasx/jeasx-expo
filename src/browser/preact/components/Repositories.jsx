import { useEffect, useState } from "preact/hooks";

export default function Repositories() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://api.github.com/search/repositories?q=jeasx+in:name&sort=updated"
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(
          (data &&
            data.items.filter(({ full_name }) =>
              full_name.includes("jeasx")
            )) ||
            []
        );
        setLoading(false);
      });
  }, []);

  return (
    <div class="repositories">
      {loading && <p>Loading...</p>}
      {items && (
        <ul>
          {items.map(({ html_url, full_name, description }) => (
            <li>
              <a href={html_url} target="_blank" rel="noopener noreferrer">
                {full_name}
              </a>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
