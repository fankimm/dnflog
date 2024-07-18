interface FetcherProps {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}
const fetcher = async ({ url, method = 'GET' }: FetcherProps) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json',
    },
  });
  const result = await response.json();
  return result;
};

export default fetcher;
