import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { InfiniteListPresentation, DisplayItem } from "./components";
import { INFINITE_ITEMS_QUERY } from "../../templates/infiniteList";

const PAGE_SIZE = 10;

export default function InfiniteList() {
  const [keyword, setKeyword] = useState("item");
  const [queryKeyword, setQueryKeyword] = useState("item");
  const [expandedId, setExpandedId] = useState<string>();
  const { data, loading, error, fetchMore, client } = useQuery(
    INFINITE_ITEMS_QUERY,
    {
      variables: { first: PAGE_SIZE, keyword: queryKeyword },
      // 同じキーワードで再検索した際はキャッシュを優先して再利用する
      fetchPolicy: "cache-first",
      notifyOnNetworkStatusChange: true,
    },
  );

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = useCallback(() => {
    // 検索文字列を更新するだけでキャッシュを保持する
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

  const items: DisplayItem[] = data?.items.edges.map((e: any) => e.node) ?? [];

  const handleClick = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? undefined : id));
  }, []);

  return (
    <div>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value.slice(0, 5))}
        placeholder="keyword"
      />
      <button onClick={handleSearch}>Search</button>
      <InfiniteListPresentation
        items={items}
        expandedId={expandedId}
        onItemClick={handleClick}
      />
      {loading && <div>Loading...</div>}
      <div ref={loadMoreRef} />
    </div>
  );
}
