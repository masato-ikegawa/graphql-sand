export function InfiniteListPresentation({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((text) => (
        <li key={text}>{text}</li>
      ))}
    </ul>
  );
}
