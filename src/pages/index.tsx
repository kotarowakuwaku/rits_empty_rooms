import Head from "next/head";
import { Inter } from "next/font/google";
import db from "@/lib/firebase/firebase";
import { SyntheticEvent, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import Header from "@/components/layouts/Header";
import TabButton from "@/components/elements/TabButton";
import { Box } from "@mui/material";
import SelectTimeTable from "@/components/elements/TimeTableToggleButton";
import { CAMPUS_MODE, type CampusMode } from "@/types/CampusMode";
import { TiME_DETAILS, type TimeDetails } from "@/types/TimeDetails";
import { DAY_DETAILS, type DayDetails } from "@/types/DayDetails";
import { C1_ROOMS, C2_ROOMS } from "@/types/EmptyRooms";
import DisplayRoomList from "@/components/layouts/DisplayRoomList";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [rooms, setRooms] = useState<DocumentData[]>([]);
  const [campus, setCampus] = useState<CampusMode>(CAMPUS_MODE.LeftName);
  const [refreshKey, setRefreshKey] = useState(0);

  const C1: string[] = C1_ROOMS;
  const C2: string[] = C2_ROOMS;

  const [C1roomsObject, setC1roomsObject] = useState<{
    [key: string]: boolean;
  }>({});
  const [C2roomsObject, setC2roomsObject] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      const selectedCampus = campus;
      const roomData = collection(db, selectedCampus.toLowerCase());
      const snapshot: QuerySnapshot<DocumentData> = await getDocs(roomData); // snapshotの型をQuerySnapshot<DocumentData>に指定する
      const roomArray: DocumentData[] = snapshot.docs.map((doc) => doc.data()); // roomArrayの型をDocumentData[]に指定する
      setRooms(roomArray);

      const tempC1: { [key: string]: boolean } = {};
      const tempC2: { [key: string]: boolean } = {};

      C1.forEach((room) => {
        tempC1[room] = false;
      });
      C2.forEach((room) => {
        tempC2[room] = false;
      });

      roomArray.forEach((emptyRooms) => {
        emptyRooms.rooms.forEach((emptyRoom: string) => {
          if (C1.includes(emptyRoom)) {
            tempC1[emptyRoom] = true;
          }
          if (C2.includes(emptyRoom)) {
            tempC2[emptyRoom] = true;
          }
        });
      });

      setC1roomsObject(tempC1);
      setC2roomsObject(tempC2);
    };

    fetchData();
  }, [refreshKey]);

  // const tabIndex = mode === CAMPUS_MODE.LeftName ? 0 : mode === CAMPUS_MODE.CenterName ? 1 : 2;

  const handleSwitch = (
    event: SyntheticEvent<Element, Event>,
    newAlignment: CampusMode | null,
  ) => {
    if (newAlignment !== null) {
      setCampus(newAlignment);
      setRefreshKey((old) => old + 1);
    }
  };

  const [day, setDay] = useState<DayDetails>(DAY_DETAILS.mon);
  const [time, setTime] = useState<TimeDetails>(TiME_DETAILS.one);

  const handleDay = (
    event: React.MouseEvent<HTMLElement>,
    newDay: DayDetails | null,
  ) => {
    if (newDay !== null) {
      setDay(newDay);
      setRefreshKey((old) => old + 1);
    }
  };

  const handleTime = (
    event: React.MouseEvent<HTMLElement>,
    newTime: TimeDetails | null,
  ) => {
    if (newTime !== null) {
      setTime(newTime);
      setRefreshKey((old) => old + 1);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main
        style={{ backgroundColor: "#EDEAE8", width: "100vw", height: "100vh" }}
      >
        <Header />
        <Box sx={{ marginTop: "48px" }} />
        <TabButton
          leftName={CAMPUS_MODE.LeftName}
          centerName={CAMPUS_MODE.CenterName}
          rightName={CAMPUS_MODE.RightName}
          value={campus}
          onChange={handleSwitch}
        />
        <SelectTimeTable
          mon={DAY_DETAILS.mon}
          tue={DAY_DETAILS.tue}
          wed={DAY_DETAILS.wed}
          thu={DAY_DETAILS.thu}
          fri={DAY_DETAILS.fri}
          one={TiME_DETAILS.one}
          two={TiME_DETAILS.two}
          three={TiME_DETAILS.three}
          four={TiME_DETAILS.four}
          five={TiME_DETAILS.five}
          six={TiME_DETAILS.six}
          timeValue={time}
          dayValue={day}
          timeOnChange={handleTime}
          dayOnChange={handleDay}
        />
        <div>
          {campus}キャンパスのページです
          <br />
          {day}曜日{time}時限目の空き教室を表示します
        </div>

        <div style={{ display: "block" }}>
          <h2 style={{ margin: "5px 0" }}>コラーニングⅠ</h2>
          <DisplayRoomList
            BuildingName={C1}
            BuildingNameObject={C1roomsObject}
          />
        </div>
        <br />
        <div style={{ display: "block" }}>
          <h2 style={{ margin: "5px 0" }}>コラーニングⅡ</h2>
          <DisplayRoomList
            BuildingName={C2}
            BuildingNameObject={C2roomsObject}
          />
        </div>
      </main>
    </>
  );
}
