import React, { useEffect, useState } from 'react';
import {
SafeAreaView,
StyleSheet,
Text,
View,
Button,
FlatList,
ActivityIndicator,
TouchableOpacity,
Dimensions,
ScrollView,
} from 'react-native';
import TrackPlayer, {
useTrackPlayerEvents,
Event,
State
} from 'react-native-track-player';
import { setupPlayer, addTracks } from './trackPlayerServices';
import Playlist from './components/Playlist';
import Controls from './components/Controls';
import Header from './components/Header';
import Footer from './components/Footer';
import TrackProgress from './components/Tracker';
import { requestStoragePermission } from './filemanager';
import { getFiles } from './filemanager';
import { Image } from 'react-native';

function App() {

const [isPlayerReady, setIsPlayerReady] = useState(false);

useEffect(() => {
	async function setup() {
	let isSetup = await setupPlayer();

	const queue = await TrackPlayer.getQueue();
	if(isSetup && queue.length <= 0) {
		await requestStoragePermission();
		await addTracks();
	}

	setIsPlayerReady(isSetup);
	}

	setup();
}, []);

const [info, setInfo] = useState({});
useEffect(() => {
	setTrackInfo();
}, []);

useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
	if(event.state == State.nextTrack) {
	setTrackInfo();
	}
});

console.log(info.title);

async function setTrackInfo() {
	const track = await TrackPlayer.getCurrentTrack();
	const info = await TrackPlayer.getTrack(track);
	setInfo(info);
}

if(!isPlayerReady) {
	return (
	<SafeAreaView style={styles.container}>
		<ActivityIndicator size="large" color="#bbb"/>
	</SafeAreaView>
	);
}

return (
	<SafeAreaView style={styles.container}>
		<Header info={info}/>
		<View style={styles.playlistContainer}>
			<View>
				<Text style={styles.title}>Now Playing</Text>
				<Image source={require("./assets/images/placeholder.png")} style={styles.image}></Image>
				<Text style={styles.subtext}>{info.title}</Text>
			</View>
			<View>
				<Text style={styles.title}>Songs</Text>
				<Playlist/>
			</View>
		</View>
		<View style={styles.subContainer}>
			<Controls iconSize={54}/>
			<TrackProgress/>
		</View>
		<Footer/>
	</SafeAreaView>
);
}

const {width, height} = Dimensions.get("window");
const imageWidth = width * 0.375;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#112',
	},
	playlistContainer: {
		flex: 1,
		flexDirection: "row",
		padding: 20,
		justifyContent: 'space-around',
	},
	subContainer: {
		flex: 1,
		flexDirection: "column",
		padding: 20,
		justifyContent: 'space-around',
	},
	image: {
		width: imageWidth,
		height: imageWidth, 
		marginBottom: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: '#eee',
		textAlign: "center",
		marginBottom: 20,
	},
	subtext: {
		fontSize: 18,
		color: '#eee',
		textAlign: "center",
	},
});

export default App;