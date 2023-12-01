import {useState} from 'react';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useProgress} from 'react-native-track-player';

function TrackProgress() {

const styles = StyleSheet.create({
  trackProgress: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    color: '#eee'
  },
  });

  const { position, duration } = useProgress(200);

  function format(seconds) {
    let mins = (parseInt(seconds / 60)).toString().padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  return(
    <View>
      <Text style={styles.trackProgress}>
        { format(position) } / { format(duration) }
      </Text>
    </View>
  );
}
export default TrackProgress;