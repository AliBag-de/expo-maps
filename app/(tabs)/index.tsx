import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { LocationCard } from '@/components/LocationCard';
import { drivingTestLocations } from '@/data/locations';
import { Location } from '@/types/routes';
import { router } from 'expo-router';

export default function LocationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(drivingTestLocations);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredLocations(drivingTestLocations);
    } else {
      const filtered = drivingTestLocations.filter(location =>
        location.name.toLowerCase().includes(query.toLowerCase()) ||
        location.fullAddress.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  };

  const handleLocationPress = (location: Location) => {
    router.push({
      pathname: '/routes',
      params: { 
        locationName: location.name,
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
        routes: JSON.stringify(location.routes)
      }
    });
  };

  const renderLocation = ({ item }: { item: Location }) => (
    <LocationCard 
      location={item} 
      onPress={() => handleLocationPress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Driving Test Locations</Text>
        <Text style={styles.subtitle}>Choose a location to practice routes</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#6b7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search locations..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#9ca3af"
        />
      </View>

      <FlatList
        data={filteredLocations}
        renderItem={renderLocation}
        keyExtractor={(item) => item.name}
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  listContainer: {
    paddingBottom: 100,
  },
});