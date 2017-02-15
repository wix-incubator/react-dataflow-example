export async function get(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error(`failed for ${url}, status ${response.status}`);
  }
  return await response.json();
}
