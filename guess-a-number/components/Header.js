import React from 'react';
import { View, StyleSheet } from 'react-native';

import TitleText from './TitleText';
import Colors from '../constants/colors';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'black',
  },
});

export default Header;
