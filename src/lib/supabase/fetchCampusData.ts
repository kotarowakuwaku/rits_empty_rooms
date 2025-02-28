import { supabase } from "./supabase";

export const fetchCampusesData = async () => {
  try {
    const { data: campusesData, error: campusesError } = await supabase
      .from("campuses")
      .select("*");

    if (campusesError) {
      throw campusesError;
    }

    return campusesData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
