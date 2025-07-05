import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Route, Clock, MapPin } from 'lucide-react-native';

interface RouteCardProps {
  routeNumber: number;
  onPress: () => void;
}

export function RouteCard({ routeNumber, onPress }: RouteCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Route size={24} color="#059669" />
        <Text style={styles.title}>Route {routeNumber}</Text>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Clock size={16} color="#6b7280" />
          <Text style={styles.detailText}>~6 minutes</Text>
        </View>
        <View style={styles.detailItem}>
          <MapPin size={16} color="#6b7280" />
          <Text style={styles.detailText}>~1.5 km</Text>
        </View>
      </View>
      
      <Text style={styles.description}>
        Practice route with various road conditions and traffic scenarios
      </Text>
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
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
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
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});