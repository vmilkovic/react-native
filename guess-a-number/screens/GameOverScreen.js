import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>This Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          fadeDuration={1000}
          source={require('../assets/success.png')}
          style={styles.image}
          resizeMode='cover'
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{' '}
          <Text style={styles.hightlight}>{props.roundsNumber}</Text> rounds to
          guess the number{' '}
          <Text style={styles.hightlight}>{props.userNumber}</Text>.
        </BodyText>
      </View>

      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  },
  hightlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
});

export default GameOverScreen;
