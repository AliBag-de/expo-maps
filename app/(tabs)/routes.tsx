import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { RouteCard } from '@/components/RouteCard';
import { router, useLocalSearchParams } from 'expo-router';

export default function RoutesScreen() {
  const { routes: routesParam, locationName: locationNameParam, latitude, longitude } = useLocalSearchParams();
  const [routes, setRoutes] = useState<string[]>([]);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    if (routesParam && locationNameParam) {
      try {
        const parsedRoutes = JSON.parse(routesParam as string);
        setRoutes(parsedRoutes);
        setLocationName(locationNameParam as string);
      } catch (error) {
        console.error('Error parsing routes:', error);
      }
    }
  }, [routesParam, locationNameParam]);

  const handleRoutePress = (routeIndex: number) => {
    router.push({
      pathname: '/(tabs)/(navigator)',
      params: {
        routeUrl: routes[routeIndex],
        routeNumber: (routeIndex + 1).toString(),
        locationName,
        latitude,
        longitude,
      }
    });
  };

  const handleBackPress = () => {
    router.back();
  };

  const renderRoute = ({ item, index }: { item: string; index: number }) => (
    <RouteCard 
      routeNumber={index + 1}
      onPress={() => handleRoutePress(index)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <ArrowLeft size={24} color="#2563eb" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{locationName}</Text>
          <Text style={styles.subtitle}>Select a practice route</Text>
        </View>
      </View>

      <FlatList
        data={routes}
        renderItem={renderRoute}
        keyExtractor={(item, index) => `route-${index}`}
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
  listContainer: {
    paddingBottom: 100,
    paddingTop: 16,
  },
});