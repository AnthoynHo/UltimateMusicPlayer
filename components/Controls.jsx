import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player';

function Controls({ onShuffle }) {
    const playerState = usePlaybackState();
    const [isPlaying, setIsPlaying] = useState(playerState === State.Playing);

    //console.log(State);
    //console.log(playerState);

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
export default Controls;