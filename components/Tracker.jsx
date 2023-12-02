import {useState} from 'react';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';

function TrackProgress() {

const styles = StyleSheet.create({
	trackProgress: {
		textAlign: 'center',
		fontSize: 24,
		color: '#eee'
	},
	progressBar: {
		marginBottom: 15
	}
});

const { position, duration } = useProgress(200);

function format(seconds) {
	let mins = (parseInt(seconds / 60)).toString().padStart(2, '0');
	let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
	return `${mins}:${secs}`;
}

return(
	<View>
		<Slider
			maximumValue={duration}
			value={position}
			thumbTintColor='white'
            minimumTrackTintColor='white'
            maximumTrackTintColor='#FFF'
			style={styles.progressBar}
		/>
		<Text style={styles.trackProgress}>	{ format(position) } / { format(duration) }</Text>
	</View>
);
}
export default TrackProgress;