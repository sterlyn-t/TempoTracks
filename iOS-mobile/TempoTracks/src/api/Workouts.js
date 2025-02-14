import { supabase } from "../lib/supabase";
import { timeDifference } from "../utils/datetime";
async function createWorkout(
  user_id,
  status,
  timeDuration,
  workoutType,
  totalDistance,
  trainingIntervals,
  workoutName,
  playlistId
) {
  console.log("user_id:", user_id);
  console.log("status:", status);
  console.log("timeDuration:", timeDuration);
  console.log("workoutType:", workoutType);
  console.log("totalDistance:", totalDistance);
  console.log("trainingIntervals:", trainingIntervals);
  console.log("workoutName:", workoutName);
  console.log("playlistId:", playlistId);

  const totalElevationChange = 0;
  const totalEnergyBurned = 0;
  const timeStart = 0;
  const timeEnd = timeStart + timeDuration;
  const payload = {
    user_id: user_id,
    status: status,
    // time_start: timeStart,
    // time_end: timeEnd,
    // time_duration: timeDuration,
    workout_type: workoutType,
    total_distance: totalDistance,
    total_energy_burned: totalEnergyBurned,
    total_elevation_change: totalElevationChange,
    training_intervals: trainingIntervals,
    workout_name: workoutName,
    // playlist_id: playlistId,
  };

  console.log("payload:", payload);

  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  let response = await fetch(
    "https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/create-workout",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        payload: payload,
      }),
    }
  );
  const data = await response.json();
}

async function deleteWorkout(workout_id) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  let response = await fetch(
    "https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/delete-workout",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        workout_id: workout_id,
      }),
    }
  );

  const data = await response.json();
  console.log(data);
}

async function getUsersWorkouts(user_id, status) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  const payload = {
    user_id: user_id,
    status: status,
  };

  let response = await fetch(
    "https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/get-all-workouts",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        payload: payload,
      }),
    }
  );

  const data = await response.json();

  if (data.error) {
    return [];
  }

  console.log(data);
  return data;
}

const updateWorkoutStart = async (workoutId, startTime) => {
  try {
    const { data, error } = await supabase
      .from("workouts")
      .update({ time_start: startTime, status: "started" })
      .eq("workout_id", workoutId);

    if (error) {
      console.error(error);
      return null;
    }
  } catch (error) {
    console.error("Error", error.message);
    return null;
  }
};

const getWorkoutStartTime = async (workoutId) => {
  try {
    const { data, error } = await supabase
      .from("workouts")
      .select("time_start")
      .eq("workout_id", workoutId);

    return data[0].time_start;
  } catch (error) {
    console.error("Error", error.message);
    return null;
  }
};

const getWorkoutById = async (workoutId) => {
  try {
    const { data, error } = await supabase
      .from("workouts")
      .select()
      .eq("workout_id", workoutId);

    return data[0];
  } catch (error) {
    console.error("Error", error.message);
    return null;
  }
};

const updateWorkoutEnd = async (workoutId) => {
  try {
    const endTime = new Date();
    const startTime = await getWorkoutStartTime(workoutId);
    const workoutDurationInMinutes =
      (endTime - new Date(startTime)) / (1000 * 60);

    const { data, error } = await supabase
      .from("workouts")
      .update({
        time_end: endTime,
        status: "complete",
        time_duration: workoutDurationInMinutes.toFixed(2),
      })
      .eq("workout_id", workoutId);
  } catch (error) {
    console.error("Error", error.message);
    return null;
  }
};

const pauseWorkout = async (workoutId) => {
  try {
    const pauseTimestamp = new Date();
    const { data, error } = await supabase
      .from("workouts")
      .update({
        paused_at: pauseTimestamp,
        is_paused: true,
      })
      .eq("workout_id", workoutId)
      .eq("is_paused", false);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const unpauseWorkout = async (workoutId) => {
  try {
    const pauseTimestamp = new Date();
    const { data, error } = await supabase
      .from("workouts")
      .update({
        paused_at: null,
        is_paused: false,
      })
      .eq("workout_id", workoutId)
      .eq("is_paused", true);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  createWorkout,
  deleteWorkout,
  getWorkoutStartTime,
  getUsersWorkouts,
  getWorkoutById,
  updateWorkoutStart,
  pauseWorkout,
  unpauseWorkout,
  updateWorkoutEnd,
};
