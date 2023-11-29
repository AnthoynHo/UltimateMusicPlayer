import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  }
  catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  }
  finally {
    return isSetup;
  }
}

export async function addTracks(tracks) {
  console.log(tracks);
  await TrackPlayer.add([
                          { id: '1',
                            url: require('./assets/music/Back-One-Day.mp3'),
                            title: 'Back One Day',
                            artist: 'NEEFEX',
                            duration: 231,
                          },
                          { id: '2',
                            url: require('./assets/music/Careless.mp3'),
                            title: 'Careless',
                            artist: 'NEEFEX',
                            duration: 296,
                          },
                          { id: '3',
                            url: require('./assets/music/Destiny.mp3'),
                            title: 'Destiny',
                            artist: 'NEEFEX',
                            duration: 206,
                        }]);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
  // TODO: Attach remote event handlers
}