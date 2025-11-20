# Restaurant Finder Backend

Backend service that:
- Converts natural language requests to structured restaurant search JSON via an LLM.
- Queries Foursquare Places API.
- Maps results to a simplified restaurant schema.

Deployed backend (GET / and /api/execute):  
https://restaurant-finder-nine.vercel.app/

## Tech Stack
- Node.js + Express
- TypeScript (compiled to .js in src)
- Axios for HTTP
- Foursquare Places API
- Gemini (via OpenAI-compatible client)
- Custom error middleware

## Prerequisites
- Node.js 18+
- Foursquare Places API key
- Gemini API key
- Access code (internal gate if used)

## Environment Variables
Create a `.env` file (copy from `.env.example`):
```
PORT=3000
ACCESS_CODE=your_access_code
FOURSQUARE_API_KEY=your_foursquare_api_key
GEMINI_API_KEY=your_gemini_api_key
```

Notes:
- FOURSQUARE_API_KEY must be valid; requests fail otherwise.
- GEMINI_API_KEY used for LLM JSON conversion.
- ACCESS_CODE (if enforced elsewhere) should match your client logic.

## Setup (Local)
````bash
git clone https://github.com/ranielART/restaurant-finder.git
cd restaurant-finder
cp [.env.example](http://_vscodecontentref_/0) .env   # edit values
npm install
npm run dev            # e.g. uses nodemon / ts-node (adjust if different)
# or
npm run build && npm start
````

## Assumptions / Limitations
- price_level, rating, and operating hours return fields can't be accessed because I need a Foursquare Places API Premium subscription to access.
- Returned restaurant fields may be "N/A" due to limited free API payload. 

