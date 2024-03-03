import React from "react";
import { View, Text, SafeAreaView, ScrollView, Button } from "react-native";
import { useGetWorkoutTemplateById } from "../api/WorkoutTemplate.ts";
import { useTheme, Divider, ActivityIndicator } from "react-native-paper";
import { StyledText } from "../components/Workouts/CreateWorkoutTemplateForm";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Checkbox } from "../components/Inputs/Checkbox";
import { BarChart } from "react-native-gifted-charts";
import { Button as PaperButton } from "react-native-paper";
import { useCreateWorkout } from "../api/WorkoutsNew.ts";
import { useAppTheme } from "../provider/PaperProvider.tsx";

const intervalConstants = [
  { id: 1, title: "Recovery", active: 30, rest: 90, isChecked: false },
  { id: 2, title: "Light", active: 60, rest: 120, isChecked: false },
  { id: 3, title: "Moderate", active: 120, rest: 60, isChecked: false },
  { id: 4, title: "High", active: 20, rest: 45, isChecked: false },
  { id: 5, title: "HIIT", active: 30, rest: 30, isChecked: false },
];

function copyListNTimes<T>(list: T[], n: number): T[] {
  return Array.from({ length: n }, () => [...list]).flat();
}

const IndividualWorkoutTemplatePage = ({ route, navigation }) => {
  const theme = useAppTheme();
  const { templateId } = route.params;
  const {
    data: template,
    isPending,
    error,
  } = useGetWorkoutTemplateById(templateId);
  const createWorkout = useCreateWorkout();

  if (isPending || !template) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 12,
          backgroundColor: theme.colors.background,
          gap: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  const numericIds = template.interval_ids.map((id) => Number(id));
  //   const { data: intervalsQuery } = useGetWorkoutIntervals(numericIds);

  const workoutIcons: { [key: string]: string } = {
    Biking: "bike",
    Walking: "walk",
    Running: "run",
    HIIT: "timer",
  };

  const intervals = numericIds.map((id) =>
    intervalConstants.find((interval) => interval.id === id)
  ) as any[];

  const getIconName = (workoutType: string) => {
    return workoutIcons[workoutType];
  };

  const barData: {
    value: number;
    spacing: number;
    label?: string;
    labelTextStyle?: any;
    frontColor: string;
  }[] = [];
  let setIndex = 0;
  const overallIntervals = copyListNTimes(intervals, template.num_sets);
  for (let i = 0; i < overallIntervals.length; i++) {
    const newSetCheck = i % intervals.length === 0;
    if (newSetCheck) {
      setIndex++;
    }
    barData.push({
      value: Number(overallIntervals[i].active),
      spacing: 2,
      label: newSetCheck ? `${setIndex}` : "",
      labelTextStyle: { color: theme.colors.foregroundMuted },
      frontColor: theme.colors.bar,
    });
    barData.push({
      value: Number(overallIntervals[i].rest),
      spacing: 2,
      frontColor: theme.colors.barContrast,
    });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: theme.colors.background,
        gap: 24,
      }}
    >
      <Header navigation={navigation} label={template.name} />
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              gap: 8,
              borderWidth: 1,
              borderColor: theme.colors.border,
              padding: 16,
              borderRadius: 4,
              backgroundColor: theme.colors.card,
              marginBottom: 16,
            }}
          >
            <View style={{ marginBottom: 8 }}>
              <StyledText text={template.name} fontSize={24} />
            </View>
            <Text style={{ color: theme.colors.foregroundMuted }}>
              {template.description}
            </Text>
            {template.last_completed && (
              <Text
                style={{
                  color: theme.colors.foregroundMuted,
                  fontSize: 12,
                  fontStyle: "italic",
                }}
              >
                Last completed:{" "}
                {new Date(template.last_completed).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </Text>
            )}
            <Divider />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Column
                label="Type"
                value={template.type}
                icon={getIconName(template.type)}
              />
              <Column
                label="Distance"
                value={template.expected_distance}
                units="km"
              />
              <Column
                label="Duration"
                value={Number(template.expected_duration) / 60}
                units="mins"
              />
              <Column label="Sets" value={template.num_sets} units="sets" />
            </View>
            <View style={{ marginTop: 16, marginBottom: 4, gap: 8 }}>
              <Text style={{ color: theme.colors.text }}>Set Breakdown</Text>
              <View>
                {intervals.map((interval, index) => (
                  <Checkbox
                    id={interval.id}
                    key={index}
                    disabled
                    title={interval.title}
                    index={index + 1}
                    subTitle={`${interval.active} secs active, ${interval.rest} secs rest`}
                    value={true}
                  />
                ))}
              </View>
            </View>
            <View style={{ marginTop: 4 }}>
              <Text
                style={{
                  color: theme.colors.text,
                  marginBottom: 16,
                  fontSize: 16,
                }}
              >
                Intervals
              </Text>
              <View style={{ gap: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 16,
                    alignSelf: "center",
                    gap: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        height: 16,
                        width: 16,
                        borderRadius: 4,
                        backgroundColor: theme.colors.bar,
                      }}
                    />
                    <Text style={{ color: theme.colors.text }}>active</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        height: 16,
                        width: 16,
                        borderRadius: 4,
                        backgroundColor: theme.colors.barContrast,
                      }}
                    />
                    <Text style={{ color: theme.colors.text }}>rest</Text>
                  </View>
                </View>
                <BarChart
                  data={barData}
                  barWidth={16}
                  spacing={24}
                  roundedTop
                  roundedBottom
                  yAxisLabelSuffix=" s"
                  xAxisType="dashed"
                  xAxisColor={theme.colors.foregroundMuted}
                  xAxisLength={285}
                  xAxisThickness={1}
                  yAxisThickness={0}
                  yAxisTextStyle={{ color: "gray" }}
                  noOfSections={3}
                  maxValue={120}
                  rulesLength={285}
                  rulesColor={theme.colors.foregroundMuted}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 16,
                marginBottom: 8,
                flexDirection: "row",
                gap: 8,
              }}
            >
              <PaperButton
                style={{
                  borderRadius: 8,
                  paddingVertical: 4,
                  width: "100%",
                  backgroundColor: theme.colors.primary,
                }}
                textColor={theme.colors.primaryForeground}
                labelStyle={{ fontSize: 20, fontWeight: "bold" }}
                onPress={() => {
                  navigation.navigate("StartOrCancelWorkoutPage", {
                    templateId: templateId,
                  });
                }}
              >
                Start
              </PaperButton>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const Column = ({
  label,
  units,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  units?: string;
  icon?: string;
}) => {
  const theme = useAppTheme();
  return (
    <View style={{ flexDirection: "column", gap: 4 }}>
      <Text style={{ color: theme.colors.text }}>{label}</Text>
      <View style={{ flexDirection: "row", gap: 4 }}>
        {icon && (
          <MaterialCommunityIcons
            name={icon as any}
            size={14}
            color={theme.colors.foregroundMuted}
          />
        )}
        <Text style={{ color: theme.colors.foregroundMuted }}>
          {value} {units}
        </Text>
      </View>
    </View>
  );
};

const Header = ({ navigation, label }) => {
  const theme = useAppTheme();
  return (
    <View
      style={{
        alignItems: "flex-start",
        flexDirection: "row",
      }}
    >
      <Button onPress={() => navigation.goBack()} title="Back" />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 8,
          marginRight: 50,
        }}
      >
        <Text
          style={{ fontSize: 20, fontWeight: "bold", color: theme.colors.text }}
        >
          Workout Details
        </Text>
      </View>
    </View>
  );
};

export default IndividualWorkoutTemplatePage;
