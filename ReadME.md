User enters ogURL + phrase
        ↓
Frontend → POST /api/shorten
        ↓
Backend:
   validate
   generate slug
   store mapping
        ↓
Return slug
        ↓
Frontend shows newURL
        ↓
User visits newURL
        ↓
Browser → GET /slug
        ↓
Backend:
   resolve slug
   redirect OR return JSON
        ↓
Browser loads ogURL