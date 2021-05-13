import React from 'react';
import { StatusBar, StyleSheet, ToastAndroid } from 'react-native';

const Toast = ({ visible, message }) => {
    if (visible) {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return null;
    }
    return null;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingTop: StatusBar.currentHeight,
      backgroundColor: "#888888",
      padding: 8
    }
  });
  
  export default Toast;

