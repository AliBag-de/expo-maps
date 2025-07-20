import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react-native';
import { NavigationStep } from '@/components/NavigationStep';
import { RouteService } from '@/services/routeService';
import { NavigationRoute } from '@/types/routes';
import { router, useLocalSearchParams } from 'expo-router';
import { combineAllSteps, fetchDirections, parseWaypointsFromUrl, resolveShortUrl } from '@/services/routeHelper';

export default function NavigationScreen() {
  const params = useLocalSearchParams();
  const routeUrl = params.routeUrl as string;
  const latitudeParam = params.latitude as string;
  const longitudeParam = params.longitude as string;
 
  const [route, setRoute] = useState<NavigationRoute | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
   const [routeInfo, setRouteInfo] = useState({})
   const [routeSteps, setRouteSteps] = useState([])



  const fetchRouteDetails = async () => {
    try {
      setLoading(true);
      setHasError(false);
      setErrorMessage('');

      // Validate parameters before making the request
      if (!routeUrl) {
        setHasError(true);
        setErrorMessage('Route is not specified.\nSelect Route from Locations and Routes screen.');
        return;
      }

      if (!latitudeParam || !longitudeParam) {
        setHasError(true);
        setErrorMessage('Location coordinates are missing');
        return;
      }

      const latitude = parseFloat(latitudeParam);
      const longitude = parseFloat(longitudeParam);

      if (isNaN(latitude) || isNaN(longitude)) {
        setHasError(true);
        setErrorMessage('Invalid location coordinates');
        return;
      }

      const routeData = await RouteService.getRouteDetails(routeUrl, latitude, longitude);
      // const longUrl = await RouteService.expandGoogleMapsUrl(routeUrl)
      const longUrl= await resolveShortUrl(routeUrl)
      const wayPoints= await parseWaypointsFromUrl(longUrl)
      const _route= await fetchDirections(wayPoints)
      setRouteInfo(_route?.routes?.[0])
      // console.log(_route?.routes?.[0].legs)
      setRouteSteps(()=>combineAllSteps(_route?.routes?.[0].legs)||[])
      // setRoute(_route )

      setRoute(routeData);
    } catch (error) {
      console.error('Error loading route:', error);
      setHasError(true);
      setErrorMessage('Failed to load route details');
    } finally {
      setLoading(false);
    }
  };





  useEffect(() => {
    fetchRouteDetails();
  }, [routeUrl, latitudeParam, longitudeParam]);

  const handleStartNavigation = () => {
    // setIsNavigating(true);
    // In a real app, you would start location tracking here
    router.push({
      pathname: '/(tabs)/(navigator)/navigateMap',
      params:{
        target:JSON.stringify(params),
        polyLine:routeInfo?.overview_polyline?.points,
      }
    });
    // simulateNavigation();
  };

  const handlePauseNavigation = () => {
    setIsNavigating(false);
  };

  const handleResetNavigation = () => {
    setIsNavigating(false);
    setCurrentStepIndex(0);
  };

  const simulateNavigation = () => {
    // Simulate progressing through navigation steps
    const interval = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev >= (route?.steps.length || 0) - 1) {
          setIsNavigating(false);
          clearInterval(interval);
          Alert.alert('Navigation Complete', 'You have reached your destination!');
          return prev;
        }
        return prev + 1;
      });
    }, 3000); // Progress every 3 seconds for demo
  };

  const handleBackPress = () => {
    router.back();
  };

  const renderStep = ({ item, index }: { item: any; index: number }) => (
    <NavigationStep
      step={item}
      isActive={index === currentStepIndex}
    />
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" style={StyleSheet.absoluteFill} />
        {hasError && <Text style={styles.errorText}>{hasError}</Text>}
        </View>
      </SafeAreaView>
    );
  }

  if (!route) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <ArrowLeft size={24} color="#2563eb" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Navigation</Text>
          </View>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {hasError ? errorMessage : 'Failed to load route'}
          </Text>
          <TouchableOpacity
            style={styles.errorButton}
            onPress={handleBackPress}
          >
            <Text style={styles.errorButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }




  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <ArrowLeft size={24} color="#2563eb" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Route {params.routeNumber}</Text>
          <Text style={styles.subtitle}>{params.locationName}</Text>
        </View>
      </View>

      <View style={styles.routeInfo}>
        <View style={styles.routeStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{(routeInfo?.legs?.reduce((acc, leg) => acc + leg.distance.value, 0) / 1000).toFixed(2)} km</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{Math.round(routeInfo.legs.reduce((acc, leg) => acc + leg.duration.value, 0) / 60)} mins</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{routeInfo.legs.length}</Text>
            <Text style={styles.statLabel}>Steps</Text>
          </View>
        </View>
      </View>

      <View style={styles.controls}>
        {!isNavigating ? (
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartNavigation}
          >
            <Play size={20} color="#ffffff" />
            <Text style={styles.startButtonText}>Start Navigation</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.navigationControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handlePauseNavigation}
            >
              <Pause size={20} color="#ef4444" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleResetNavigation}
            >
              <RotateCcw size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <FlatList
        // data={route.steps}
        data={routeSteps}

        renderItem={renderStep}
        keyExtractor={(item, index) => `step-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  routeInfo: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  routeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  controls: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  navigationControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  controlButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  listContainer: {
    paddingBottom: 100,
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#6b7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  errorButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});