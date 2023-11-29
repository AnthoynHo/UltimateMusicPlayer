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
} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  usePlaybackState,
  Event,
  State
} from 'react-native-track-player';
import { setupPlayer, addTracks } from './trackPlayerServices';
import Icon from 'react-native-vector-icons/FontAwesome';

function Playlist() {

    const styles = StyleSheet.create({
        playlist: {
          marginTop: 40,
          marginBottom: 40
        },
        playlistItem: {
          fontSize: 16,
          paddingTop: 4,
          paddingBottom: 4,
          paddingLeft: 8,
          paddingRight: 8,
          borderRadius: 4
        },
      });

    const [queue, setQueue] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(0);

    async function loadPlaylist() {
      const queue = await TrackPlayer.getQueue();
      setQueue(queue);
    }

    useEffect(() => {
      loadPlaylist();
    }, []);

    useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
      if(event.state == State.nextTrack) {
        TrackPlayer.getCurrentTrack().then((index) => setCurrentTrack(index));
      }
    });

    function PlaylistItem({index, title, isCurrent}) {

      function handleItemPress() {
        TrackPlayer.skip(index);
      }

      return (
        <TouchableOpacity onPress={handleItemPress}>
          <Text
            style={{...styles.playlistItem,
              ...{backgroundColor: isCurrent ? '#666' : 'transparent'}}}>
          {title}
          </Text>
        </TouchableOpacity>
      );
    }

    return(
      <View>
        <View style={styles.playlist}>
          <FlatList
            data={queue}
            renderItem={({item, index}) => <PlaylistItem
                                              index={index}
                                              title={item.title}
                                              isCurrent={currentTrack == index }/>
            }
          />
        </View>
        <Controls/>
      </View>
    );
  }

  function Controls({ onShuffle }) {
    const playerState = usePlaybackState();
    const [isPlaying, setIsPlaying] = useState(playerState === State.Playing);

    console.log(State);
    console.log(playerState);

    const handlePlayPress = async () => {
        if (isPlaying) {
          await TrackPlayer.pause();
        } else {
          await TrackPlayer.play();
        }

        setIsPlaying(!isPlaying);
      };



    return(
      //<View style={{flexDirection: 'row',
        //flexWrap: 'wrap', alignItems: 'center'}}>
        <View key={playerState} style={{ flexDirection: 'row',
         flexWrap: 'wrap', alignItems: 'center' }}>
          <Icon.Button
            name="arrow-left"
            size={28}
            backgroundColor="transparent"
            onPress={() => TrackPlayer.skipToPrevious()}/>
          <Icon.Button
                name={isPlaying ? 'pause' : 'play'}
                size={28}
                backgroundColor="transparent"
                onPress={handlePlayPress}/>
          <Icon.Button
            name="arrow-right"
            size={28}
            backgroundColor="transparent"
            onPress={() => TrackPlayer.skipToNext()}/>
      </View>
    );
  }
export default Playlist;