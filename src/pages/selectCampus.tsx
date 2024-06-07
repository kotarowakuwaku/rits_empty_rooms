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
import DisplayCheckboxRoomList from "@/components/layouts/DisplayCheckBoxList";
import Link from "next/link";
import ControlledRadioButtonsGroup from "@/components/layouts/radiobutton";
import Image from "next/image";

// const inter = Inter({ subsets: ["latin"] });

export default function SelectCampus() {
  const [campus, setCampus] = useState<CampusMode>(CAMPUS_MODE.LeftName);
  const [refreshKey, setRefreshKey] = useState(0);

  const [isFirebaseLoading, setFirebaseLoading] = useState<boolean>(false);

  const onClickRadioButton = (
    event: React.ChangeEvent<HTMLInputElement>,
    newAlignment: string,
  ) => {
    const campusMode = newAlignment as CampusMode;
    setCampus(campusMode);
    setRefreshKey((old) => old + 1);
  };

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
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <link rel="icon" href="favicon.ico" />
        <meta name="theme-color" content="#EDEAE8" />
      </Head>
      <main
        style={{
          backgroundColor: "#EDEAE8",
          height: "100vh",
        }}
      >
        <Header />
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
          キャンパス設定画面
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin:"20px 0"
          }}
        >
          <ControlledRadioButtonsGroup
            campus={campus}
            onClickRadioButton={onClickRadioButton}
          />
        </Box>
        <Box
          sx={{
            position: "relative",
            margin: "0 auto",
            width: "80%",
            height: "30%",
            maxWidth: "700px",
          }}
        >
          <Image
            src={`/${campus}.png`}
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            right: 0,
            width: "40%",
            maxWidth: "256px",
          }}
        >
          <Image
            src="/meeting_room_icon.png"
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
