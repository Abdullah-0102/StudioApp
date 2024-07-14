import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const Text = (props) => {
  const { style, ...otherProps } = props;
  const combinedStyle = [styles.text, style];

  return <RNText {...otherProps} style={combinedStyle} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-Regular', 
  },
});

export default Text;
