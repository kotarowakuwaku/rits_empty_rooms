import db from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function getEmptyRoomData(
  campus: string,
  dayTime: string,
) {
  const snapshot = await getDoc(doc(db, campus.toLowerCase(), dayTime));

  if (snapshot.exists()) {
    const roomData = [snapshot.data()];
    return roomData;
  } else {
    return null;
  }
}
