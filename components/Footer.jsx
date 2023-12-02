import React from 'react';
import {View, Text,StyleSheet, SafeAreaView, Dimensions, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function Footer() {

return(
	<SafeAreaView style={styles.container}>
		<Pressable>
			<Icon.Button
				name="home"
				size={35}
				backgroundColor="transparent"
			/>
			<Text style={styles.label}>Home</Text>
		</Pressable>
		<Pressable>
			<Icon.Button
				name="search"
				size={35}
				backgroundColor="transparent"
			/>
			<Text style={styles.label}>Search</Text>
		</Pressable>
		<Pressable>
			<Icon.Button
				name="file-o"
				size={35}
				backgroundColor="transparent"
			/>
			<Text style={styles.label}>Songs</Text>
		</Pressable>
	</SafeAreaView>
);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#20232a",
		padding: 10,
		borderRadius: 10,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		color: '#eee',

	},
})

export default Footer;