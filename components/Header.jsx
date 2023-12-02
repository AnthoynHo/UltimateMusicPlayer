import React from 'react';
import {View, Text,StyleSheet, SafeAreaView, Dimensions, Pressable} from 'react-native';
import Controls from './Controls';

function Header({ info }) {

return(
	<SafeAreaView style={styles.container}>
		<Pressable>
			<Text style={styles.songTitle}>{info.title}</Text>
			<Text style={styles.artistName}>{info.artist}</Text>
		</Pressable>
		<Controls iconSize={36}/>
	</SafeAreaView>
	// <SafeAreaView>
	// 	<Text style={styles.songTitle}>{info.title}</Text>
	// 	<Image source={require("../assets/images/placeholder.png")} style={styles.image}/>
	// </SafeAreaView>
);
}

const {width, height} = Dimensions.get("window");
const imageWidth = width * 0.875;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#20232a",
		padding: 10,
		borderRadius: 10,
	},
	songTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: '#eee',
		textAlign: "center",
	},
	artistName: {
		fontSize: 16,
		color: '#eee'
	},
	image: {
		width: imageWidth,
		height: imageWidth
	}
})

export default Header;