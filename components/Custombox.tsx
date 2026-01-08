import { Box } from '@gluestack-ui/themed';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

interface CustomBoxProps extends ViewProps {
  boxStyle?: StyleProp<ViewStyle>;     
  shadowStyle?: StyleProp<ViewStyle>;   
  children?: React.ReactNode;
}

const CustomBox: React.FC<CustomBoxProps> = ({
  boxStyle,
  shadowStyle,
  children,
  style,
  ...props
}) => {
  return (
    <View style={style} {...props}>
      <Box style={[styles.headingContainer, boxStyle]}>
        <View>{children}</View>
      </Box>
      <Box style={[styles.shadowContainer, shadowStyle]} />
    </View>
  );
};

export default CustomBox;

const styles = StyleSheet.create({
  headingContainer: {
    padding: 20,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'black',
  },
  shadowContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: 'gray',
    zIndex: -1,
  },
});
