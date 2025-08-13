User visits app → useEffect checks token → redirects to /Crud2 or /Login.
User enters credentials → submits form → calls /api/Auth/login.
Backend validates → returns token and user info.
Frontend stores token in:
localStorage → persistence across reloads.
state → use in API requests.
Redirect to /Crud2 protected page.
Future API calls include token in headers.
On refresh → token detected → redirect appropriately.
