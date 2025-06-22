import { useQuery } from "@apollo/client";
import { HelloPresentation } from "./components";
import { HELLO_QUERY } from "../../templates/hello";

export default function HelloContainer() {
  const { data, loading, error } = useQuery(HELLO_QUERY);

  let message = "Loading...";
  if (loading) {
    message = "Loading...";
  } else if (error) {
    message = "Error fetching data";
  } else {
    message = data?.hello ?? "No data";
  }

  return <HelloPresentation message={message} />;
}
