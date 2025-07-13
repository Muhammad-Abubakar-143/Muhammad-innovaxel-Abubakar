const BASE_URL = "http://localhost:4000/url"; 


export async function createShortUrl(originalUrl) {
  try{
    const res = await fetch(`${BASE_URL}/shorten`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: originalUrl })
    });
  
    if (!res.ok) {
      throw new Error("Failed to create short URL");
    }
    const data = await res.json();
    return data;
  }catch(error){
    console.error('Fetch Error:', error.message || error);
    throw new Error('Failed to create URL.');
  }
}

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

export async function getOriginalUrl(shortCode) {
  try{
    const res = await fetch(`${BASE_URL}/shorten/${shortCode}`);
  if (!res.ok) throw new Error("Short URL not found");
  return await res.json();

  }catch(err){
    console.error('Fetch Error:', err.message || err);
    throw new Error('Failed to fetch URLs from the server.');
  }
  
}


export async function updateShortUrl(shortCode, newUrl) {
  try{
    const res = await fetch(`${BASE_URL}/shorten/${shortCode}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: newUrl })
    });
  
    if (!res.ok) throw new Error("Failed to update URL");
    return await res.json();
  }catch(err){
    console.error('Fetch Error:', err.message || err);
    throw new Error('Failed to update URLs from the server.');
  }
}

export async function deleteShortUrl(shortCode) {
  try {
    const res = await fetch(`${BASE_URL}/shorten/${shortCode}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      throw new Error(`Failed to delete URL: ${res.status} ${res.statusText}`);
    }
    if (res.status === 204) {
      return;
    }

    return await res.json();
  } catch (error) {
    console.error('Fetch Error:', error.message || error);
    throw new Error('Failed to delete URLs from the server.');
  }
}


export async function getUrlStats(shortCode) {
  try{
    const res = await fetch(`${BASE_URL}/shorten/${shortCode}/stats`);
    if (!res.ok) throw new Error("Failed to get stats");
    return await res.json();
  }catch(err){
    console.error('Fetch Error:', err.message || err);
    throw new Error('Failed to fetch URLs from the server.');
  }
}
