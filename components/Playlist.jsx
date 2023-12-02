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

function Playlist() {

    const styles = StyleSheet.create({
        playlist: {

          color:'#eee'
        },
        playlistItem: {
          fontSize: 16,
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 5,
          color:'#eee'
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
      </View>
    );
  }
export default Playlist;