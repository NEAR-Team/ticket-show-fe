import { useState, useCallback } from "react";
import axios from "axios";

axios.defaults.baseURL = `${process.env.domain}/api`;

function usePost(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const mutate = useCallback(
    async (body) => {
      setLoading("loading...");
      setData(null);
      setError(null);
      // const source = axios.CancelToken.source();
      axios
        .post(url, body)
        .then((res) => {
          setLoading(false);
          //checking for multiple responses for more flexibility
          //with the url we send in.
          res.data && setData(res.data);
          return res.data;
        })
        .catch((err) => {
          setLoading(false);
          setError("An error occurred. Awkward..");
        });
      // return () => {
      //   source.cancel();
      // };
    },
    [url]
  );

  return { data, loading, error, mutate };
}

export default usePost;
