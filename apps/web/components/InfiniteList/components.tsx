export interface DisplayItem {
  id: string;
  text: string;
  name: string;
  address: string;
}

export function InfiniteListPresentation({
  items,
  expandedId,
  onItemClick,
}: {
  items: DisplayItem[];
  expandedId?: string;
  onItemClick: (id: string) => void;
}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <div onClick={() => onItemClick(item.id)}>{item.text}</div>
          {expandedId === item.id && (
            <div>
              <div>{item.name}</div>
              <div>{item.address}</div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
