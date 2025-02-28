import { supabase } from "./supabase";

export const fetchSupabaseData = async () => {
  try {
    const { data: roomsData, error: roomsError } = await supabase
      .from("rooms")
      .select("*");

    if (roomsError) {
      throw roomsError;
    }

    return roomsData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
