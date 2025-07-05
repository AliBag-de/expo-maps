import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Navigation } from 'lucide-react-native';
import { Location } from '@/types/routes';

interface LocationCardProps {
  location: Location;
  onPress: () => void;
}

export function LocationCard({ location, onPress }: LocationCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <MapPin size={24} color="#2563eb" />
        <Text style={styles.name}>{location.name}</Text>
      </View>
      
      <Text style={styles.address}>{location.fullAddress}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.routeCount}>
          {location.routes.length} routes available
        </Text>
        <Navigation size={20} color="#6b7280" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
    flex: 1,
  },
  address: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeCount: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
});