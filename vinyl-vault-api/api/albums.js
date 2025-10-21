// Serverless function to fetch album data from Airtable
// This keeps your API token secure on the server

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
    const BASE_ID = 'appqVael6KMb3tn4e';
    const TABLE_NAME = 'Source of Truth';

    if (!AIRTABLE_TOKEN) {
      return res.status(500).json({ error: 'API token not configured' });
    }

    // Fetch all records from Airtable
    let allRecords = [];
    let offset = null;

    do {
      const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}${offset ? `?offset=${offset}` : ''}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error(`Airtable API error: ${response.status}`);
      }

      const data = await response.json();
      allRecords = allRecords.concat(data.records);
      offset = data.offset;
    } while (offset);

    // Transform Airtable records to match the format expected by VinylVault
    const albums = allRecords.map(record => ({
      id: record.id,
      ...record.fields
    }));

    // Enable CORS so your React app can call this
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

    return res.status(200).json({ albums, count: albums.length });
  } catch (error) {
    console.error('Error fetching from Airtable:', error);
    return res.status(500).json({ error: 'Failed to fetch albums', message: error.message });
  }
}
