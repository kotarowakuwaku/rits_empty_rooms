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

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [rooms, setRooms] = useState<DocumentData[]>([]);
  const [campus, setCampus] = useState<CampusMode>(CAMPUS_MODE.LeftName);
  const [refreshKey, setRefreshKey] = useState(0);
  const C1: string[] = [
    "c101",
    "c102",
    "c103",
    "c104",
    "c105",
    "c106",
    "c107",
    "c108",
    "c109",
    "c201",
    "c202",
    "c203",
    "c204",
    "c205",
    "c206",
    "c301",
    "c302",
    "c303",
    "c304",
    "c305",
    "c306",
    "c401",
    "c402",
    "c403",
  ];

  const [C1roomsObject, setC1roomsObject] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      const selectedCampus = campus;
      const roomData = collection(db, selectedCampus.toLowerCase());
      const snapshot: QuerySnapshot<DocumentData> = await getDocs(roomData); // snapshotの型をQuerySnapshot<DocumentData>に指定する
      const roomArray: DocumentData[] = snapshot.docs.map((doc) => doc.data()); // roomArrayの型をDocumentData[]に指定する
      setRooms(roomArray);

      const kari: { [key: string]: boolean } = {};

      C1.forEach((room) => {
        kari[room] = false;
      });

      roomArray.forEach((emptyRooms) => {
        emptyRooms.rooms.forEach((emptyRoom: string) => {
          if (C1.includes(emptyRoom)) {
            kari[emptyRoom] = true; // 部屋が存在する場合、trueに設定
          }
        });
      });

      setC1roomsObject(kari);
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

        <div>
          <h2>コラーニングⅠ</h2>
          {C1.map((CheckC1emptyRoom: string) => {
            if (C1roomsObject[CheckC1emptyRoom] === true) {
              return (
                <div
                  key={CheckC1emptyRoom}
                  style={{ float: "left", margin: "0 5px" }}
                >
                  <div>{CheckC1emptyRoom}</div>
                </div>
              );
            } else if (C1roomsObject[CheckC1emptyRoom] === false) {
              return (
                <div
                  key={CheckC1emptyRoom}
                  style={{ float: "left", margin: "0 5px", opacity: "0.1" }}
                >
                  <div>{CheckC1emptyRoom}</div>
                </div>
              );
            }
          })}
        </div>
      </main>
    </>
  );
}
