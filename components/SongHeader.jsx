import {useState,useEffect} from 'react';
import React from 'react';
import {View, Text,StyleSheet} from 'react-native';
import TrackPlayer, {useTrackPlayerEvents, Event,State} from 'react-native-track-player';

function Header() {

const styles = StyleSheet.create({
songTitle: {
    fontSize: 32,
    marginTop: 50,
    color: '#eee'
  },
  artistName: {
    fontSize: 24,
    color: '#eee'
  },
  });

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

  return(
    <View>
        <Text style={styles.songTitle}>{info.title}</Text>
        <Text style={styles.artistName}>{info.artist}</Text>
    </View>
  );
}
export default Header;