// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import Playlist from './Playlist';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native';

const MusicPage = ({ route, navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
            <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold'
            }}>
              Playlist Filters
            </Text>
            <TouchableOpacity
            style={styles.button}
            /*onPress={
              () => navigation.navigate(
                'SettingsStack', { screen: 'Settings' }
              )}*/>
            <Text>Filters</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
              fontWeight: 'bold'
            }}>
            Your Playlists
          </Text>
          <ScrollView 
          style={{
            height: '80vh'
          }}>
            <Playlist name = "Jog"></Playlist>
            <Playlist name = "Run"></Playlist>
            <Playlist name = "Hike"></Playlist>
            <Playlist name = "HIIT"></Playlist>
            <Playlist name = "Sprint"></Playlist>
            <Playlist name = "Jog"></Playlist>
            <Playlist name = "Run"></Playlist>
            <Playlist name = "Hike"></Playlist>
            <Playlist name = "HIIT"></Playlist>
            <Playlist name = "Sprint"></Playlist>
          </ScrollView >
        </View>
        {/*<Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          React Native Bottom Navigation
        </Text>*/}
        {/*<Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text>*/}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
    marginBottom: 50
  },
});
export default MusicPage;