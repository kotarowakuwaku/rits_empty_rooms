import Head from "next/head";
import { SyntheticEvent, useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import DisplayRoomList from "@/components/layouts/DisplayRoomList";
import addEmptyRoomsData from "@/lib/firebase/addEmptyRoomsData";
import getEmptyRoomData from "@/lib/firebase/getEmptyRoomsData";
import Header from "@/components/layouts/Header";
import TabButton from "@/components/elements/TabButton";
import { Box } from "@mui/material";
import SelectTimeTable from "@/components/elements/TimeTableToggleButton";
import { CAMPUS_MODE, type CampusMode } from "@/types/CampusMode";
import { TiME_DETAILS, type TimeDetails } from "@/types/TimeDetails";
import { DAY_DETAILS, type DayDetails } from "@/types/DayDetails";
import { C1_ROOMS, C2_ROOMS } from "@/types/EmptyRooms";
import DisplayCheckboxRoomList from "@/components/layouts/DisplayCheckBoxList";
import Link from "next/link";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [rooms, setRooms] = useState<DocumentData[]>([]);
  const [campus, setCampus] = useState<CampusMode>(CAMPUS_MODE.LeftName);
  const [refreshKey, setRefreshKey] = useState(0);

  const [day, setDay] = useState<DayDetails>(DAY_DETAILS.mon);
  const [time, setTime] = useState<TimeDetails>(TiME_DETAILS.one);
  const [dayTime, setDayTime] = useState("月");

  const [isFirebaseLoading, setFirebaseLoading] = useState<boolean>(false);

  const C1: string[] = C1_ROOMS;
  const C2: string[] = C2_ROOMS;

  const [C1roomsObject, setC1roomsObject] = useState<{
    [key: string]: boolean;
  }>({});
  const [C2roomsObject, setC2roomsObject] = useState<{
    [key: string]: boolean;
  }>({});

  const [submitC1Rooms, setSubmitC1Rooms] = useState<string[]>([]);
  const [submitC2Rooms, setSubmitC2Rooms] = useState<string[]>([]);
  const handleUpdateSubmitC1Rooms = (updatedObject: string[]) => {
    setSubmitC1Rooms(updatedObject);
  };
  const handleUpdateSubmitC2Rooms = (updatedObject: string[]) => {
    setSubmitC2Rooms(updatedObject);
  };

  const handleSubmit = async () => {
    const submitEmptyRooms: string[] = submitC1Rooms.concat(submitC2Rooms);
    await addEmptyRoomsData(
      submitEmptyRooms,
      campus.toLowerCase(),
      `${day}${time}`,
    );
  };

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

  const handleDay = (
    event: React.MouseEvent<HTMLElement>,
    newDay: DayDetails | null,
  ) => {
    if (newDay !== null) {
      setDay(newDay);
      switch (newDay) {
        case DAY_DETAILS.mon:
          setDayTime("月");
          break;
        case DAY_DETAILS.tue:
          setDayTime("火");
          break;
        case DAY_DETAILS.wed:
          setDayTime("水");
          break;
        case DAY_DETAILS.thu:
          setDayTime("木");
          break;
        case DAY_DETAILS.fri:
          setDayTime("金");
          break;
      }
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

  useEffect(() => {
    setFirebaseLoading(true);
    const fetchData = async () => {
      const roomData = await getEmptyRoomData(campus, `${day}${time}`);
      if (roomData) {
        setRooms(roomData);

        const tempC1: { [key: string]: boolean } = {};
        const tempC2: { [key: string]: boolean } = {};
        C1.forEach((room) => {
          tempC1[room] = false;
        });
        C2.forEach((room) => {
          tempC2[room] = false;
        });

        roomData.forEach((emptyRooms) => {
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

        const tempSubmitC1Rooms: string[] = Object.keys(tempC1).filter(
          (key) => tempC1[key] === true,
        );
        const tempSubmitC2Rooms: string[] = Object.keys(tempC2).filter(
          (key) => tempC2[key] === true,
        );
        setSubmitC1Rooms(tempSubmitC1Rooms);
        setSubmitC2Rooms(tempSubmitC2Rooms);
      } else {
        setRooms([]);
        const tempC1: { [key: string]: boolean } = {};
        const tempC2: { [key: string]: boolean } = {};
        C1.forEach((room) => {
          tempC1[room] = false;
        });
        C2.forEach((room) => {
          tempC2[room] = false;
        });
        setC1roomsObject(tempC1);
        setC2roomsObject(tempC2);
        setSubmitC1Rooms([]);
        setSubmitC2Rooms([]);
      }
      setFirebaseLoading(false);
    };

    fetchData();
  }, [refreshKey]);

  if (isFirebaseLoading === true) {
    return (
      <main>
        <div>ろーでぃんぐ</div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>RitsEmptyRooms_admin</title>
      </Head>
      <main
        style={{ backgroundColor: "#EDEAE8", width: "100%", height: "100%" }}
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

        <h3>ここは管理者ページです 空き教室の追加,削除,編集を行えます</h3>
        <h4>
          {campus}キャンパスの
          {dayTime}曜日{time}時限目の空き教室を編集します
        </h4>

        <div style={{ display: "block", clear: "left" }}>
          <h2 style={{ margin: "5px 0" }}>コラーニングⅠ</h2>
          <DisplayCheckboxRoomList
            BuildingName={C1}
            BuildingNameObject={C1roomsObject}
            submitBuildingName={handleUpdateSubmitC1Rooms}
          />
        </div>
        <div style={{ display: "block", clear: "left" }}>
          <h2 style={{ margin: "5px 0" }}>コラーニングⅡ</h2>
          <DisplayCheckboxRoomList
            BuildingName={C2}
            BuildingNameObject={C2roomsObject}
            submitBuildingName={handleUpdateSubmitC2Rooms}
          />
        </div>
        <div style={{ clear: "left" }}>
          <Link href="/" style={{ color: "inherit" }}>
            <button
              onClick={handleSubmit}
              style={{
                width: "70%",
                height: "100px",
                margin: "10px",
                backgroundColor: "#990000",
                color: "white",
                fontSize: "1.125rem",
              }}
            >
              更新
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
