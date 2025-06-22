import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { InfiniteListPresentation } from "./components";
import { INFINITE_ITEMS_QUERY } from "../../templates/infiniteList";

const PAGE_SIZE = 10;

export default function InfiniteList() {
  const [keyword, setKeyword] = useState("item");
  const [queryKeyword, setQueryKeyword] = useState("item");
  const { data, loading, error, fetchMore, client } = useQuery(
    INFINITE_ITEMS_QUERY,
    {
      variables: { first: PAGE_SIZE, keyword: queryKeyword },
      notifyOnNetworkStatusChange: true,
    },
  );

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = useCallback(() => {
    client.cache.evict({ fieldName: "items" });
    client.cache.gc();
    setQueryKeyword(keyword);
  }, [client, keyword]);

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
            keyword: queryKeyword,
            after: data.items.pageInfo.endCursor,
          },
        });
      }
    },
    [data, fetchMore, loading, queryKeyword],
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
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value.slice(0, 5))}
        placeholder="keyword"
      />
      <button onClick={handleSearch}>Search</button>
      <InfiniteListPresentation items={items} />
      {loading && <div>Loading...</div>}
      <div ref={loadMoreRef} />
    </div>
  );
}
