import { doc, setDoc } from "firebase/firestore";
import db from "@/lib/firebase/firebase";

export default async function addEmptyRoomsData(EmptyRoomsData: string[]) {
  // Add a new document in collection "cities"
  const addDataRef = doc(db, "bkc", "mon1");
  await setDoc(addDataRef, {
    rooms: EmptyRoomsData,
  });
}
