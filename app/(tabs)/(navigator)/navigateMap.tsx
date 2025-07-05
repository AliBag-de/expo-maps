import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Play, StepBack } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const navigateMap = () => {
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
      <Text>navigateMap</Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={()=>router.back()}
          >
            <StepBack size={20} color="#ffffff" />
            <Text style={styles.startButtonText}>Start Navigation</Text>
          </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default navigateMap

const styles = StyleSheet.create({
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

})