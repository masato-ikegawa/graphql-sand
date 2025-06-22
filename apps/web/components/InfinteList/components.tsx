export function InfinteListPresentation({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((text) => (
        <li key={text}>{text}</li>
      ))}
    </ul>
  );
}
