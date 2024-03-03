import { StyleSheet, Text, View } from "react-native";
import { Slider } from "react-native-elements";
import { ProgressBar } from "react-native-paper";

interface Props {
  playbackTime: number;
  duration: number;
}

const formatSecondsIntoTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return `${minutes}:${seconds}`;
};

export const SongDuration = ({ playbackTime, duration }: Props) => {
  return (
    <View style={styles.progressBarContainer}>
      <Slider
        style={styles.progressBar}
        value={0.33}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#36a2df"
        maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
        trackStyle={styles.trackStyle}
        thumbStyle={styles.thumbStyle}
      />
      <View style={styles.durationContainer}>
        <Text style={styles.durationText}>
          {formatSecondsIntoTime(playbackTime)}
        </Text>
        <Text style={styles.durationText}>
          {formatSecondsIntoTime(Math.round(duration / 1000))}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    marginTop: 20,
    display: "flex",
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  durationContainer: {
    marginTop: -10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
  progressBar: {
    width: 300,
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  trackStyle: {
    height: 4,
    borderRadius: 0,
  },
  thumbStyle: {
    height: 0,
    width: 0,
  },
  durationText: {
    fontSize: 12,
    opacity: 0.5,
    color: "white",
    textAlign: "center",
  },
});
