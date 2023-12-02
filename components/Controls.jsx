import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player';

function Controls({ iconSize }) {
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
        <View key={playerState} style={{ flexDirection: 'row',
         flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Icon.Button
            name="arrow-left"
            size={iconSize}
            backgroundColor="transparent"
            onPress={() => TrackPlayer.skipToPrevious()}/>
          <Icon.Button
                name={isPlaying ? 'pause' : 'play'}
                size={iconSize}
                backgroundColor="transparent"
                onPress={handlePlayPress}/>
          <Icon.Button
            name="arrow-right"
            size={iconSize}
            backgroundColor="transparent"
            onPress={() => TrackPlayer.skipToNext()}/>
      </View>
    );
}
export default Controls;