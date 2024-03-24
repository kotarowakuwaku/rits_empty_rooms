import { doc, setDoc } from "firebase/firestore";
import db from "@/lib/firebase/firebase";

export default async function addEmptyRoomsData(
  EmptyRoomsData: string[],
  Campus: string,
  DayTime: string,
) {
  // Add a new document in collection "cities"
  const addDataRef = doc(db, Campus, DayTime);
  await setDoc(addDataRef, {
    rooms: EmptyRoomsData,
  });
}
