import { PermissionsAndroid } from 'react-native';
import { Alert, Linking } from 'react-native';
import RNFS from 'react-native-fs';
import TrackPlayer from 'react-native-track-player';

//Checks files at root of storage, recursively searches directories for files with .mp3 extension
//Supposed to return a list of files, instead adds files as they're found
//Hacky, but will work for now
export async function getFiles(subPath = null) {
	//Ideal method, returns all files from system storage
    let path = subPath ? subPath : RNFS.ExternalStorageDirectoryPath;

    //console.log("Reading directory " + path);

    RNFS.readDir(path)
	.then(result => {
	//console.log("Found " + result.length + " files in " + path)
    const trackPromises = result.map(file => {
        if (file.isDirectory()) {
            return getFiles(file.path).catch(error => console.error('Error in getFiles(isDirectory):', error));
        } else if (file.name.endsWith('.mp3')) {
			console.log("Pushing " + file.name);
			//TODO: Get artists, duration, etc. from file metadata
			const track = {
				id: file.path,
				url: file.path,
				title: file.name,
				artist: 'Unknown',
				duration: 0,
			};
			TrackPlayer.add(track);
            return file;
        }
	})
	//const tracks = Promise.all(trackPromises);
    //return tracks.flat();
    })
	.catch(error => {
		console.error('Error in getFiles:', error);
	});
}

//Old version, attempts to return files before all subdirectories are searched
/*export async function getFiles(subPath = null) {
	//let files = [];
	let tracks = [];
	let path = subPath ? subPath : RNFS.ExternalStorageDirectoryPath;
	console.log("Reading directory " + path);

	RNFS.readDir(path)
	.then(result => {
		//console.log('Hopefully there are some files here:');
		//Log each file in a separate line
		result.forEach(file => {
			console.log(file.isDirectory() ? 'dir: ' : 'file: ', file.name);
			if (file.isDirectory()) {
				getFiles(file.path)
				.then((subTracks) => {
					//Only push if subTracks is not empty
					if (subTracks) {
						console.log("Pushing " + subTracks.length + " tracks");
						subTracks.forEach(track => {
							tracks.push(track);
						});
					}
					else {
						console.log("No tracks found in " + file.path);
					}
				})
				.catch(error => {
					console.error('Error in getFiles(isDirectory):', error);
				});
			}
		});
		// Filter the results to get only mp3 files
		if (result)
		{
			const files = result.filter(file => file.name.endsWith('.mp3'));

			// Log the mp3 files
			//console.log('MP3 Files:', tracks);
			let currentID = 0;
			files.forEach(track => {
				console.log("Pushing " + track.name);
				tracks.push({
					id: currentID++,
					url: track.path,
					title: track.name,
					artist: 'Unknown',
					duration: 0,
				});
				//console.log(tracks);
			});
		}

		//TrackPlayer.add(tracks);
		//TrackPlayer.setRepeatMode(RepeatMode.Queue);
		//console.log('Done reading directory');
		return tracks;
	})
	.catch(error => {
		console.error('Error in getFiles:', error);
	});
}*/



//File permmission request function, requires <uses-permission android:name="android.permission.READ_MEDIA_AUDIO" /> in AndroidManifest.xml
  export async function requestStoragePermission() {
	try {
	  console.log("Requesting " + PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO);
	  const granted = await PermissionsAndroid.request(
		PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
		{
		  title: "Storage Permission",
		  message: "This app needs access to your storage to find your music.",
		  buttonNeutral: "Ask Me Later",
		  buttonNegative: "Cancel",
		  buttonPositive: "OK"
		}
	  );
	  //console.log("Permission should be " + PermissionsAndroid.RESULTS.GRANTED + ", recieved " + granted);
	  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
		console.log("You can use the storage");
	  } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
		Alert.alert(
		  "Storage Permission Required",
		  "This app needs to access your storage to find your music. Please grant the permission from the app settings.",
		  [
			{
			  text: "Go to Settings",
			  onPress: () => Linking.openSettings(),
			},
			{
				text: "I don't care",
				onPress: () => console.log("Cancel Pressed"),
			}
		  ],
		  { cancelable: false }
		);
	  } else {
		console.log("Storage permission denied");
	  }
	} catch (err) {
	  console.warn(err);
	}
}