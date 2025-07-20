import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowRight, ArrowLeft, ArrowUp } from 'lucide-react-native';
import { RouteStep } from '@/types/routes';
import { WebView } from 'react-native-webview';

interface NavigationStepProps {
  step: RouteStep;
  isActive: boolean;
}

export function NavigationStep({ step, isActive }: NavigationStepProps) {
  const getDirectionIcon = (instruction: string) => {
    if (instruction.toLowerCase().includes('right')) {
      return <ArrowRight size={20} color={isActive ? '#ffffff' : '#059669'} />;
    } else if (instruction.toLowerCase().includes('left')) {
      return <ArrowLeft size={20} color={isActive ? '#ffffff' : '#059669'} />;
    } else {
      return <ArrowUp size={20} color={isActive ? '#ffffff' : '#059669'} />;
    }
  };

    const htmlWithStyle = `
    <div style="font-size: 12px; line-height: 0.7;">
      ${step.html_instructions}
    </div>
  `;
  return (
    <View style={[styles.container, isActive && styles.activeContainer]}>
      <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
        {getDirectionIcon(step.html_instructions)}
      </View>
      
      <View style={styles.content}>
      <WebView
            scalesPageToFit={false}
      style={{ height: 'auto',backgroundColor:"transparent" }}
      
      originWhitelist={['*']}
      source={{ html:  htmlWithStyle }}
    />
        {/* <Text style={[styles.instruction, isActive && styles.activeInstruction]}>
          {step.html_instructions}
        </Text> */}
        <View style={styles.details}>
          <Text style={[styles.distance, isActive && styles.activeDetails]}>
            {step.distance.text}
          </Text>
          <Text style={[styles.duration, isActive && styles.activeDetails]}>
            {step.duration.text}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeContainer: {
    backgroundColor: '#059669',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flex: 1,
  },
  instruction: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  activeInstruction: {
    color: '#ffffff',
    fontWeight: '600',
  },
  details: {
    flexDirection: 'row',
    gap: 12,
  },
  distance: {
    fontSize: 14,
    color: '#6b7280',
  },
  duration: {
    fontSize: 14,
    color: '#6b7280',
  },
  activeDetails: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
});