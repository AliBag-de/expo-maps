import { NavigationRoute, RouteStep } from '@/types/routes';

// Mock route data - In a real app, you'd fetch this from Google Directions API
const mockRouteSteps: RouteStep[] = [
  {
    instruction: "Head north on Main Street",
    distance: "0.2 km",
    duration: "1 min",
    coordinates: { latitude: 51.8740386, longitude: -8.51128 }
  },
  {
    instruction: "Turn right onto Cork Road",
    distance: "0.5 km", 
    duration: "2 min",
    coordinates: { latitude: 51.8750386, longitude: -8.51028 }
  },
  {
    instruction: "Continue straight through roundabout",
    distance: "0.3 km",
    duration: "1 min", 
    coordinates: { latitude: 51.8760386, longitude: -8.50928 }
  },
  {
    instruction: "Turn left onto Industrial Estate Road",
    distance: "0.4 km",
    duration: "2 min",
    coordinates: { latitude: 51.8770386, longitude: -8.50828 }
  },
  {
    instruction: "Arrive at destination on the right",
    distance: "0.1 km",
    duration: "30 sec",
    coordinates: { latitude: 51.8780386, longitude: -8.50728 }
  }
];

export class RouteService {
  static async getRouteDetails(googleMapsUrl: string, startLat: number, startLng: number): Promise<NavigationRoute> {
    // In a real implementation, you would:
    // 1. Parse the Google Maps URL to extract waypoints
    // 2. Use Google Directions API to get detailed route information
    // 3. Return structured navigation data
    
    // For now, we'll return mock data with some variation based on the URL
    const routeId = googleMapsUrl.split('/').pop() || 'unknown';
    
    return {
      id: routeId,
      name: `Driving Test Route ${routeId.slice(-6)}`,
      steps: mockRouteSteps.map((step, index) => ({
        ...step,
        coordinates: {
          latitude: startLat + (index * 0.001),
          longitude: startLng + (index * 0.001)
        }
      })),
      totalDistance: "1.5 km",
      totalDuration: "6 min",
      startLocation: {
        latitude: startLat,
        longitude: startLng
      },
      endLocation: {
        latitude: startLat + 0.005,
        longitude: startLng + 0.005
      }
    };
  }

  static async expandGoogleMapsUrl(shortUrl: string): Promise<string> {
    // In a real implementation, you would make a request to expand the shortened URL
    // and extract the actual route parameters
    try {
      const response = await fetch(shortUrl, { method: 'HEAD' });
      return response.url || shortUrl;
    } catch (error) {
      console.warn('Could not expand URL:', error);
      return shortUrl;
    }
  }
}