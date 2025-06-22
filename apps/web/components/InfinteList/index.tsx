import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useRef } from "react";
import { InfinteListPresentation } from "./components";
import { INFINTE_ITEMS_QUERY } from "../../templates/infinteList";

const PAGE_SIZE = 10;

export default function InfinteList() {
  const { data, loading, error, fetchMore } = useQuery(INFINTE_ITEMS_QUERY, {
    variables: { first: PAGE_SIZE },
    notifyOnNetworkStatusChange: true,
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        data?.items.pageInfo.hasNextPage &&
        !loading
      ) {
        fetchMore({
          variables: {
            first: PAGE_SIZE,
            after: data.items.pageInfo.endCursor,
          },
        });
      }
    },
    [data, fetchMore, loading],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [handleObserver]);

  if (error) return <div>Error loading items</div>;

  const items = data?.items.edges.map((e: any) => e.node.text) ?? [];

  return (
    <div>
      <InfinteListPresentation items={items} />
      {loading && <div>Loading...</div>}
      <div ref={loadMoreRef} />
    </div>
  );
}
