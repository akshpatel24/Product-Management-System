User visits app → useEffect checks token → redirects to /Crud2 or /Login.
User enters credentials → submits form → calls /api/Auth/login.
Backend validates → returns token and user info.
Frontend stores token in:
localStorage → persistence across reloads.
state → use in API requests.
Redirect to /Crud2 protected page.
Future API calls include token in headers.
On refresh → token detected → redirect appropriately.


AUGUST 13:
Added a global search function that is case-insensitive and filters across all product attributes.


August 14:
Removed the useContext implementation that was storing the token on the front end. This was unnecessary since the token is already being retrieved in real time from the server, eliminating the need to maintain it in client-side state.

August 16:
Fixed persisting issue with Remember Me button.

In layout.tsx

Goal: check once → “do we have a token? if yes go here, else go there.”

After redirect, the layout’s job is done.

You don’t need React to “watch” token changes because you aren’t displaying data with it.

That’s why you can just read it from localStorage and redirect. No state required.

🔹 In page.tsx

Goal: fetch data and display products.

This is different because:

The UI depends on token (if no token → show nothing / error, if token → fetch list).

The data fetching should re-run if token changes (e.g., user logs in, logs out, or refreshes token).