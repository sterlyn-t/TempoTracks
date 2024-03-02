import { supabase } from "../lib/supabase";
import { useQuery, useMutation } from "@tanstack/react-query";
import { TablesInsert } from "../lib/db.types";

export const useCreateWorkoutTemplate = () => {
  return useMutation({
    mutationFn: async (template: TablesInsert<"workout_templates">) => {
      const { data, error } = await supabase
        .from("workout_templates")
        .insert(template)
        .select();

      if (error) {
        console.log("Error creating workout template", error);
        return null;
      }

      return data;
    },
  });
};

export const useGetWorkoutTemplates = (userId: string) => {
  return useQuery({
    queryKey: ["workout_templates", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workout_templates")
        .select()
        .eq("user_id", userId);

      if (error) {
        console.log("Error fetching workout templates", error);
        return null;
      }
      console.log(data);
      return data;
    },
  });
};

export const useGetWorkoutTemplateById = (id: string) => {
  return useQuery({
    queryKey: ["workoutTemplate", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workout_templates")
        .select()
        .eq("id", id.replace(/"/g, ""))
        .single();

      if (error) {
        console.log("Error fetching workout templates", error);
        return null;
      }
      return data;
    },
  });
};
