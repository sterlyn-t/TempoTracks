// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, { useState, useEffect } from "react";
import updateSettings from "../api/Settings";
import updateUser from "../api/"
import { useTheme, Text, TouchableOpacity } from "react-native-paper";
import { Switch, TextInput, Button, ToggleButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slider } from "react-native-elements";
import { StyleSheet, View, SafeAreaView} from "react-native";
import { ScrollView } from "react-native";
import useThemeStore from "../hooks/useThemeStore";
import { saved_user_data } from "../api/Globals";

const SettingsPage = ({ route, navigation }) => {
  const [user, setUser] = useState({});
  const [dataStream, setDataStream] = useState(false);
  const [fade, setFade] = useState(20);
  const [mix, setMix] = useState(20);
  const [explicitContent, setExplicitContent] = useState(false);
  const [peakNormalize, setPeakNormalize] = useState(1);
  const [bpmWarning, setBPMWarning] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const { toggleTheme } = useThemeStore();

  useEffect(() => {
    async function fetchData() {
      const value = await AsyncStorage.getItem("user_data");
      if (value !== null) {
        setUser(JSON.parse(value));
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("State changed!");
    async function fetchData() {
      console.log("in async");
      await updateSettings(
        user.user_id,
        dataStream,
        fade,
        mix,
        explicitContent,
        peakNormalize,
        bpmWarning
      );
    }
    fetchData();
  });

  const onToggleSwitch = () => {
    setDataStream(!dataStream);
  };

  const onFade = (value) => {
    setFade(value);
    console.log(value);
  };

  const onMix = (value) => {
    setMix(value);
    console.log(value);
  };

  const onExplicitContent = () => {
    setExplicitContent(!explicitContent);
  };

  const onBPMWarning = () => {
    setBPMWarning(!bpmWarning);
  };

  const onDarkMode = () => {
    setDarkMode(!darkMode)
    toggleTheme()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background}}>
      <Text
        style={{
          marginTop: "5%",
          marginLeft: "2%",
        }}
        theme={theme.colors.text}
        variant={"headlineLarge"}
      >
        Settings
      </Text>
      <ScrollView>
        <View>
        <View style={styles.setting}>
          <Text style={{margin: 10}} theme={theme.colors.text} variant="titleLarge">Physical Info</Text>
            <Button
          style={{ width: "10%", margin: "3%", marginLeft: "35%", borderRadius: 4}}
          buttonColor={theme.colors.primary}
          textColor={theme.colors.card}
          title="Edit"
          icon="delete"
          mode="contained"
          onPress={() => console.log("Pressed")}
        ></Button>
        </View>
          <View style={styles.setting}>
            <Text style={{margin: "5%", paddingRight: "1%"}} theme={theme.colors.text} variant="bodyLarge">Height:</Text>
            <TextInput label="Height (cm)" value={saved_user_data.height} style={{width: '40%'}}/>
          </View>
          <View style={styles.setting}>
            <Text style={{margin: "5%"}} theme={theme.colors.text} variant="bodyLarge">Weight:</Text>
            <TextInput label="Weight (kg)" value={saved_user_data.weight} style={{width: '40%'}}/>
          </View>
          <View style={styles.setting}>
            <Text style={{margin: "5%", paddingRight: "6%"}} theme={theme.colors.text} variant="bodyLarge">Age:</Text>
            <TextInput label="Age" style={{width: '40%'}}/>
          </View>
          <Text style={{margin: 10}} theme={theme.colors.text} variant="titleLarge">Account</Text>
          <View style={styles.setting}>
            <Text style={{margin: "5%"}} theme={theme.colors.text} variant="bodyLarge">User ID:</Text>
            <Text>{saved_user_data.user_id ?? ""}</Text>
          </View>
          <View style={styles.setting}>
            <Text style={{margin: "5%"}} theme={theme.colors.text} variant="bodyLarge">Name:</Text>
            <Text>{`${saved_user_data.first_name} ${saved_user_data.last_name}` ?? ""}</Text>
          </View>
          <View style={styles.setting}>
            <Text style={{margin: "5%"}} theme={theme.colors.text} variant="bodyLarge">Username:</Text>
            <Text>{saved_user_data.username}</Text>
          </View>
          <View style={styles.setting}>
            <Text style={{margin: "5%"}} theme={theme.colors.text} variant="bodyLarge">Email:</Text>
            <Text>{saved_user_data.email}</Text>
          </View>
          <View style={styles.setting}>
            <Text style={{margin: "5%"}} theme={theme.colors.text} variant="bodyLarge">Phone Number:</Text>
            <Text>{saved_user_data.phone_number}</Text>
          </View>
          {/*<View style={styles.setting}>
            <Text style={{margin: "5%"}} theme={theme.colors.text} variant="bodyLarge">Change Username</Text>
            <TextInput label="Username" style={{width: '40%'}}/>
      </View>*/}
        </View>
        {/*<Button
          style={{ width: "45%", justifyContent: "flex-start", margin: "5%", borderRadius: 6}}
          buttonColor={theme.colors.primary}
          textColor={theme.colors.card}
          icon="delete"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Delete Account
      </Button>*/}
        {/*<View>
          <Text style={{margin: 10}} theme={theme.colors.text} variant="titleLarge">Dark Mode</Text>
          <View style={styles.setting}>
            <Text style={{margin: "5%"}} theme={theme.colors.text} variant="bodyLarge">Turn On Dark Mode</Text>
            <Switch
              color="#09BC8A"
              value={darkMode}
              onValueChange={onDarkMode}
            />
    </View>
        </View>*/}
        {/*<View>
          <Text style={{margin: 10}} theme={theme.colors.text} variant="titleLarge">Data Saver</Text>
          <View style={styles.setting}>
            <Text style={{margin: "5%"}} theme={theme.colors.text} variant="bodyLarge">Turn Off Data Streaming</Text>
            <Switch
              color="#09BC8A"
              value={dataStream}
              onValueChange={onToggleSwitch}
            />
          </View>
        </View>
        <View>
          <Text style={{margin: 10}} theme={theme.colors.text} variant="titleLarge">Playback</Text>
          <View style={styles.setting}>
            <Text style={{margin: "5%"}} theme={theme.colors.text} variant="bodyLarge">Crossfade</Text>
            <Text>0s</Text>
            <Slider
              style={{
                width: "50%",
              }}
              value={fade}
              onValueChange={onFade}
              step={0.25}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor={"09BC8A"}
              trackStyle={styles.trackStyle}
              thumbStyle={styles.thumbStyle}
              thumbTintColor="#09BC8A"
            />
            <Text>15s</Text>
          </View>
          <View style={styles.setting}>
            <Text style={{margin: "5%"}} theme={theme.colors.text} variant="bodyLarge">Automix</Text>
            <Slider
              style={{
                width: "50%",
                marginLeft: "5%",
              }}
              value={mix}
              onValueChange={onMix}
              step={0.25}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor={"09BC8A"}
              trackStyle={styles.trackStyle}
              thumbStyle={styles.thumbStyle}
              thumbTintColor="#004346"
            />
          </View>
          <View style={styles.setting}>
            <Text style={{margin: "5%"}} theme={theme.colors.text} variant="bodyLarge">Explicit Content</Text>
            <Switch
              color="#09BC8A"
              value={explicitContent}
              onValueChange={onExplicitContent}
            />
          </View>
        </View>
        <View>
          <Text style={{margin: 10}} theme={theme.colors.text} variant="titleLarge">Workouts</Text>
          <View style={styles.setting}>
            <Text style={{margin: "5%"}} theme={theme.colors.text} variant="bodyLarge">Peak Normalization</Text>
            <ToggleButton icon="battery-low" value="low" />
            <ToggleButton icon="battery-medium" value="medium" />
            <ToggleButton icon="battery-high" value="high" />
          </View>
          <View style={styles.setting}>
            <Text style={{margin: "5%"}} theme={theme.colors.text} variant="bodyLarge">High BPM Warning</Text>
            <Switch
              color="#09BC8A"
              value={bpmWarning}
              onValueChange={onBPMWarning}
            />
          </View>
            </View>*/}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  setting: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  trackStyle: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#09BC8A",
  },
  thumbStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#09BC8A",
  },
});
export default SettingsPage;
