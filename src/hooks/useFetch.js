import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const dataAPI = await response.json();
        setData(dataAPI);
      } catch (error) {
        setErro(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url]);
  return { data, isLoading, erro };
};

export default useFetch;
