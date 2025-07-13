const BASE_URL = "http://localhost:4000/url"; 


export async function getAllShortUrls() {
  try {
    const res = await fetch(`${BASE_URL}/shorten`);

    // console.log('res', res)

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error.message || error);
    throw new Error('Failed to fetch URLs from the server.');
  }
}

