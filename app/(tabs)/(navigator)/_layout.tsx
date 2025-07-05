import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
<Stack
screenOptions={{
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: "horizontal",
}}
>
    <Stack.Screen name="index" />
    <Stack.Screen name="navigateMap"
    options={{
        presentation:"containedModal"
    }}
    />
</Stack>
  )
}

export default _layout