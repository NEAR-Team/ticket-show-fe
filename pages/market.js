import useFetch from "../hooks/useFetch";

export default function MarketPage() {
  const { data, loading, error } = useFetch("/shows");

  console.log(data, loading, error);

  return null;
}
