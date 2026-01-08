import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeadingProps {
  heading: string;
}

const Heading = ({ heading }: HeadingProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{heading}</Text>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827', 
    letterSpacing: 0.3,
  },
  divider: {
    marginTop: 8,
    height: 1,
    backgroundColor: '#E5E7EB', 
  },
});

export default Heading;
