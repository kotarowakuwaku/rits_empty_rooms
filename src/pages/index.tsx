import Head from "next/head";
import { SyntheticEvent, useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import DisplayRoomList from "@/components/layouts/DisplayRoomList";
import addEmptyRoomsData from "@/lib/firebase/addEmptyRoomsData";
import getEmptyRoomData from "@/lib/firebase/getEmptyRoomsData";
import Header from "@/components/layouts/Header";
import TabButton from "@/components/elements/TabButton";
import { Box } from "@mui/material";
import TimeTable from "@/components/elements/TimeTableButton";
import DayTimeTable from "@/components/elements/DayTimeTableButton";
import { CAMPUS_MODE, type CampusMode } from "@/types/CampusMode";
import { TiME_DETAILS, type TimeDetails } from "@/types/TimeDetails";
import { DAY_DETAILS, type DayDetails } from "@/types/DayDetails";
import { C1_ROOMS, C2_ROOMS } from "@/types/EmptyRooms";
import "normalize.css";
import Image from "next/image";
import { useRouter } from "next/router";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const [rooms, setRooms] = useState<DocumentData[]>([]);
  const [campus, setCampus] = useState<CampusMode>(CAMPUS_MODE.LeftName);
  const [refreshKey, setRefreshKey] = useState(0);

  const [day, setDay] = useState<DayDetails>(DAY_DETAILS.mon);
  const [time, setTime] = useState<TimeDetails>(TiME_DETAILS.one);
  const [dayTime, setDayTime] = useState("mon1");

  const [isFirebaseLoading, setFirebaseLoading] = useState<boolean>(false);

  const C1: string[] = C1_ROOMS;
  const C2: string[] = C2_ROOMS;

  const [C1roomsObject, setC1roomsObject] = useState<{
    [key: string]: boolean;
  }>({});
  const [C2roomsObject, setC2roomsObject] = useState<{
    [key: string]: boolean;
  }>({});

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
      if (router.query.campus != undefined) {
        setCampus(router.query.campus as CampusMode);
      }
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
        <title>RitsEmptyRooms</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
        <link rel="icon" href="favicon.ico" />
        <meta name="theme-color" content="#EDEAE8" />
      </Head>

      <main
        style={{
          backgroundColor: "#EDEAE8",
          height: "100vh",
        }}
      >
        <Header campus={campus}/>
        {/* <TabButton
          leftName={CAMPUS_MODE.LeftName}
          centerName={CAMPUS_MODE.CenterName}
          rightName={CAMPUS_MODE.RightName}
          value={campus}
          onChange={handleSwitch}
        /> */}
        <Box
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "2rem",
            padding: "40px 0 20px 0",
            "@media screen and (max-width:480px)": {
              fontSize: "1rem",
              padding: "30px 0 20px 0",
            },
          }}
        >
          {campus}の空き教室一覧
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
            placeItems: "center",
            "@media screen and (max-width:480px)": {
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            },
          }}
        >
          <DayTimeTable
            mon={DAY_DETAILS.mon}
            tue={DAY_DETAILS.tue}
            wed={DAY_DETAILS.wed}
            thu={DAY_DETAILS.thu}
            fri={DAY_DETAILS.fri}
            dayValue={day}
            dayOnChange={handleDay}
          />
          <TimeTable
            one={TiME_DETAILS.one}
            two={TiME_DETAILS.two}
            three={TiME_DETAILS.three}
            four={TiME_DETAILS.four}
            five={TiME_DETAILS.five}
            six={TiME_DETAILS.six}
            timeValue={time}
            timeOnChange={handleTime}
          />
        </Box>

        <div
          style={{
            display: "flex",
            margin: "50px 0 10px 10px",
            justifyContent: "center",
            flexFlow: "column",
          }}
        >
          <h4
            style={{
              margin: "5px 0",
              textDecoration: "underline ",
              textDecorationThickness: "0.5px",
            }}
          >
            コラーニングⅠ
          </h4>
          <div style={{ marginLeft: "50px" }}>
            <DisplayRoomList
              BuildingName={C1}
              BuildingNameObject={C1roomsObject}
            />
          </div>
        </div>
        <br />
        <div style={{ display: "inline-block", margin: "10px 0 10px 10px" }}>
          <h4
            style={{
              margin: "5px 0",
              textDecoration: "underline",
              textDecorationThickness: "0.5px",
            }}
          >
            コラーニングⅡ
          </h4>
          <div style={{ marginLeft: "50px" }}>
            <DisplayRoomList
              BuildingName={C2}
              BuildingNameObject={C2roomsObject}
            />
          </div>
        </div>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            right: 30,
            width: "50%",
            maxWidth: "196px",
          }}
        >
          <Image
            src="/RER_logo.png"
            width={256}
            height={256}
            layout="responsive"
            alt=""
          />
        </Box>
      </main>
    </>
  );
}
