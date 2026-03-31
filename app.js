const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

async function renderReviews() {
  const grid = document.getElementById('reviews-grid');
  if (!grid) return;

  let reviews = [];

  try {
    const apiKey = window.GOOGLE_PLACES_API_KEY || '';
    const placeId = window.GOOGLE_PLACE_ID || '';

    if (apiKey && placeId) {
      // Optional live mode. Requires a valid Google Places API setup.
      const fields = 'displayName,rating,userRatingCount,reviews';
      const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=${fields}`, {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': fields
        }
      });
      const data = await response.json();
      reviews = (data.reviews || []).map(item => ({
        author: item.authorAttribution?.displayName || 'Google Reviewer',
        rating: item.rating || 0,
        text: item.text?.text || '',
        relativeDate: item.relativePublishTimeDescription || 'Recently',
        source: 'Google Reviews'
      }));
    }
  } catch (error) {
    console.warn('Live Google review sync failed, falling back to local review data.', error);
  }

  if (!reviews.length) {
    try {
      const response = await fetch('reviews.json');
      reviews = await response.json();
    } catch (error) {
      console.error('Could not load local review data.', error);
      grid.innerHTML = '<article class="info-card review-card"><h3>Reviews unavailable</h3><p>Add reviews.json or connect Google Places API credentials to show live 5 star reviews.</p></article>';
      return;
    }
  }

  const fiveStarOnly = reviews.filter(review => Number(review.rating) === 5);

  grid.innerHTML = fiveStarOnly.map(review => `
    <article class="info-card review-card">
      <div class="stars">★★★★★</div>
      <h3>${review.author}</h3>
      <time>${review.relativeDate || review.source || 'Google Reviews'}</time>
      <p>${review.text}</p>
    </article>
  `).join('');
}

renderReviews();
