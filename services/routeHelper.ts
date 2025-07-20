import polyline from '@mapbox/polyline';

/**
 * Part 1a: Resolves a short goo.gl link to its final destination URL.
 * We use fetch because it automatically follows redirects. The final URL
 * is available in the 'response.url' property.
 * @param {string} shortUrl
 * @returns {Promise<string>} The full, resolved URL.
 */
const resolveShortUrl = async (shortUrl: string) => {
  console.log('Resolving short URL...');
  const response = await fetch(shortUrl, { method: 'HEAD' }); // HEAD is faster as it doesn't download the body
  if (!response.ok) {
    throw new Error('Failed to resolve the short URL.');
  }
  //   console.log('Resolved to:', response.url);
  return response.url;
};

/**
 * Part 1b: Parses the full Google Maps URL to extract waypoints.
 * A typical directions URL looks like: google.com/maps/dir/Start/Waypoint1/End
 * @param {string} longUrl
 * @returns {string[]} An array of decoded waypoint names.
 */
const parseWaypointsFromUrl = (longUrl: string) => {
  console.log('Parsing waypoints from full URL...');
  const urlParts = longUrl.split('/');
  const dirIndex = urlParts.indexOf('dir');

  if (dirIndex === -1) {
    throw new Error(
      'Could not find directions ("dir") in the URL. Is this a route link?'
    );
  }

  const waypoints = [];
  // Loop through the parts after "dir"
  for (let i = dirIndex + 1; i < urlParts.length; i++) {
    const part = urlParts[i];

    // Stop if we hit the data part or the query parameters
    if (part.startsWith('data=') || part.includes('?')) {
      break;
    }

    // --- THE FIX ---
    // NEW: Skip map view parameters, which start with '@'
    if (part.startsWith('@')) {
      continue; // Skip this part and go to the next iteration
    }
    // ----------------

    // Decode the URL component (e.g., "New+York" -> "New York") and add to array
    waypoints.push(decodeURIComponent(part.replace(/\+/g, ' ')));
  }

  if (waypoints.length < 2) {
    throw new Error(
      'Could not parse at least two waypoints (origin and destination).'
    );
  }

  //   console.log('Parsed Waypoints:', waypoints);
  return waypoints;
};
/**
 * Part 2: Calls the Google Directions API with the parsed waypoints.
 * @param {string[]} waypoints - Array of waypoint names.
 * @returns {Promise<object>} The JSON response from the Directions API.
 */
const fetchDirections = async (waypoints: string[]) => {
  console.log('Fetching directions from Google API...');
  const origin = waypoints[0];
  const destination = waypoints[waypoints.length - 1];

  // Intermediate waypoints are everything between the first and last
  const intermediateWaypoints = waypoints.slice(1, -1).join('|');

  let apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}&key=${
    process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
  }`;


  if (intermediateWaypoints) {
    apiUrl += `&waypoints=${encodeURIComponent(intermediateWaypoints)}`;
  }

  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.status !== 'OK') {
    throw new Error(
      `Directions API Error: ${JSON.stringify(data, null, 2)} - ${
        data.error_message || 'No additional details.'
      }`
    );
  }

  console.log('Directions API response received.');
  return data;
};

function combineAllSteps(route: any[]) {
  // Tüm step'leri birleştireceğimiz dizi
  const allSteps: any[] = [];

  // Her leg için steps dizisini allSteps'e ekleyelim
  route.forEach((leg) => {
    if (leg.steps && Array.isArray(leg.steps)) {
      allSteps.push(...leg.steps);
    }
  });
  //   console.log("allSteps",JSON.stringify(allSteps, null, 2))
  return allSteps;
}
const polyLineDecoder = (encodedPolyline: string) => {
  const decodedCoordinates = polyline
    .decode(encodedPolyline)
    .map(([latitude, longitude]) => ({
      latitude,
      longitude,
    }));
  return decodedCoordinates;
};

export {
  resolveShortUrl,
  parseWaypointsFromUrl,
  fetchDirections,
  combineAllSteps,
  polyLineDecoder,
};
