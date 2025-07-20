export interface Location {
  name: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  routes: string[];
}

export interface RouteStep {
  instruction: string;
  distance: string;
  duration: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface NavigationRoute {
  id: string;
  name: string;
  steps: RouteStep[];
  totalDistance: string;
  totalDuration: string;
  startLocation: {
    latitude: number;
    longitude: number;
  };
  endLocation: {
    latitude: number;
    longitude: number;
  };
}