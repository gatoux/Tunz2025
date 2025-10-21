# Vinyl Vault API

This is a serverless API that securely fetches your vinyl collection data from Airtable.

## Deployment Instructions

### 1. Deploy to Vercel

In Vercel dashboard:
- Click "Import Git Repository" (or you can drag and drop these files)
- Upload the `api` folder and `vercel.json` file

OR use Vercel CLI:
```bash
npm install -g vercel
cd vinyl-vault-api
vercel
```

### 2. Add Environment Variable

After deployment, in your Vercel project:
1. Go to Settings → Environment Variables
2. Add a new variable:
   - Name: `AIRTABLE_TOKEN`
   - Value: [Your Airtable Personal Access Token]
   - Apply to: Production, Preview, and Development

### 3. Redeploy

After adding the environment variable, trigger a redeploy so it takes effect.

### 4. Get Your API URL

After deployment, Vercel will give you a URL like:
`https://your-project-name.vercel.app`

Your API endpoint will be:
`https://your-project-name.vercel.app/api/albums`

### 5. Update VinylVault Component

Replace the fetch URL in your React component with your new API endpoint.

## API Endpoint

**GET** `/api/albums`

Returns all albums from your Airtable base.

Response format:
```json
{
  "albums": [
    {
      "id": "rec123...",
      "Artist": "The Beatles",
      "Album": "Abbey Road",
      ...
    }
  ],
  "count": 123
}
```

## Security

- Your Airtable API token is stored as an environment variable and never exposed
- CORS is enabled to allow your React app to call this API
- The API only allows GET requests (read-only)
