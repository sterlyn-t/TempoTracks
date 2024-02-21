//
//  WatchConnectivityHandler.swift
//  Companion Watch App
//
//  Created by Alexander Ma on 2024-02-09.
//

import WatchConnectivity

class WatchConnectivityHandler: NSObject, WCSessionDelegate {
  static let shared = WatchConnectivityHandler()
  
  // Tight coupling
  static let musicViewModel = MusicViewModel(songs: [
    Song(apple_id: "1", title: "Song 1"),
    Song(apple_id: "2", title: "Song 2"),
  ])
  
  static let workoutViewModel = WorkoutViewModel(workouts: [
    Workout(workout_id: nil, template_id: "8ea28706-50f7-42a6-943c-a63a33f3a72f", name: "Biking", hk_type: .cycling),
    Workout(workout_id: nil, template_id: "running", name: "Running", hk_type: .running),
    Workout(workout_id: nil, template_id: "hiking", name: "Hiking", hk_type: .hiking),
    Workout(workout_id: nil, template_id: "HIIT", name: "HIIT", hk_type: .highIntensityIntervalTraining)
  ])

  private override init() {
    super.init()
  }
  
  func setWorkoutManager(workout_manager: WorkoutManager){
    WatchConnectivityHandler.workoutViewModel.workout_manager = workout_manager
  }
  
  func activateSession() {
    if WCSession.isSupported() {
      let session = WCSession.default
      session.delegate = self
      session.activate()
    }
  }
    
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
      switch activationState {
      case .activated:
          print("Watch WCSession activated successfully.")
      case .notActivated:
          if let error = error {
              print("Watch WCSession failed to activate with error: \(error.localizedDescription)")
          }
      default:
          break // No action needed for .inactive in watchOS
      }
  }
  
  func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
    guard let fn_name = message["functionName"] as? String else {
      return
    }
      
    if fn_name == "sendSongs" {
      guard let songs = message["songs"] as? String else {
        return
      }
      
      let adaptedSongs = SongAdapter.adapter.adaptJsonToSong(json: songs)
      WatchConnectivityHandler.musicViewModel.updateSongsState(with: adaptedSongs)
    }
    else if fn_name == "sendWorkouts" {
      guard let workouts = message["workouts"] as? String else {
        return
      }
      
      let adaptedWorkout = WorkoutAdapter.adapter.adaptJsonToWorkout(json: workouts)
      
      //TODO: do something with adapted workouts once workout page is done
    }
    else if fn_name == "updateWorkoutId" {
      guard let workout_id = message["workout_id"] as? String else {
        return
      }
      
      guard let template_id = message["template_id"] as? String else {
        return
      }
      
      DispatchQueue.main.async {
        WatchConnectivityHandler.workoutViewModel.updateWorkoutId(workout_id: workout_id, template_id: template_id)
      }
    }
    else if fn_name == "togglePauseWorkout" {
      guard let workout_id = message["workout_id"] as? String else {
        return
      }
      
      DispatchQueue.main.async {
        WatchConnectivityHandler.workoutViewModel.togglePause(workout_id: workout_id)
      }
    }
    else if fn_name == "endWorkout" {
      guard let workout_id = message["workout_id"] as? String else {
        return
      }
      
      DispatchQueue.main.async {
        WatchConnectivityHandler.workoutViewModel.endWorkout(workout_id: workout_id)
      }
    }
  }
  
  func send(_ function_name: String, _ data: String) {
      guard WCSession.default.activationState == .activated else {
        print("Cannot send message 1")
        return
      }

      guard WCSession.default.isCompanionAppInstalled else {
        print("Cannot send message 2")
        return
      }
    
      print(WCSession.default.isReachable)
      
      WCSession.default.sendMessage(["functionName": function_name, "data": data], replyHandler: { (reply) in
          // Handle reply from iPhone here
          print(reply)
      }, errorHandler: { (error) in
          print("Cannot send message: \(String(describing: error))")
      })
    
      print("END OF SENT MSG");
  }
}
