# Posh Optical Luxury Website Concept

This is a static multi page front end concept for an upgraded Posh Optical website.

## Included pages
- Home
- About
- Services
- Contact

## Review setup
The homepage review section is built to show only 5 star reviews.

### Current demo mode
- Reads from `reviews.json`
- Ships with 3 review entries based on review copy already visible on the current live Posh Optical reviews page

### Optional live Google review mode
To make the review section update with new 5 star Google reviews:
1. Create a Google Places API key
2. Get the Google Place ID for Posh Optical
3. Before `app.js` runs, define:

```html
<script>
  window.GOOGLE_PLACES_API_KEY = 'YOUR_API_KEY';
  window.GOOGLE_PLACE_ID = 'YOUR_PLACE_ID';
</script>
```

4. Keep `app.js` as is. It will try live Google data first, then fall back to `reviews.json`.

## Suggested next improvements
- Replace placeholder gradients with professional store and eyewear photography
- Connect the contact form to Formspree, Web3Forms, or a custom backend
- Add live booking embed if desired
- Build a fuller shop section if ecommerce is a priority
