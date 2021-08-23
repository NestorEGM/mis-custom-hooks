import { useEffect, useRef, useState } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, error: null, loading: true });
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        if (isMounted.current) {
          setState({
            loading: false,
            error: null,
            data,
          });
        } else {
          console.log('No se llamo setState');
        }
      })
      .catch(() => {
        setState({
          data: null,
          loading: false,
          error: 'No se pudo de cargar la info',
        });
      });
  }, [url]);
  return state;
};
