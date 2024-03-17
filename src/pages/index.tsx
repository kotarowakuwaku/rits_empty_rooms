import Head from "next/head";
import { Inter } from "next/font/google";
import db from "@/lib/firebase/firebase";
import { SyntheticEvent, useEffect, useState } from "react";
import {collection, getDocs} from 'firebase/firestore';
import  Header  from "@/components/layouts/Header";
import TabButton from "@/components/elements/TabButton"
import { Box } from "@mui/material";
import SelectTimeTable from "@/components/elements/TimeTableToggleButton";
import { CAMPUS_MODE, type CampusMode } from "@/types/CampusMode";
import { TiME_DETAILS, type TimeDetails } from "@/types/TimeDetails";
import { DAY_DETAILS, type DayDetails } from "@/types/DayDetails";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const [rooms, setRooms] = useState([]);

  // useEffect(()=>{
  //   const roomData = collection(db,"rooms");
  //   getDocs(roomData).then((snapShot)=>{
      // console.log(snapShot.docs.map((doc)=>({...doc.data()})));
      // setRooms(snapShot.docs.map((doc) => ({...doc.data() })));
  //   });
  // },[]);
  const [mode, setMode] = useState<CampusMode>(CAMPUS_MODE.LeftName);
  // const tabIndex = mode === CAMPUS_MODE.LeftName ? 0 : mode === CAMPUS_MODE.CenterName ? 1 : 2;

  const handleSwitch = (event: SyntheticEvent<Element, Event>, newAlignment: CampusMode | null) => {
    if (newAlignment !== null) {
      setMode(newAlignment);
    }
  };


  const [day, setDay] = useState<DayDetails>(DAY_DETAILS.mon);
  const [time, setTime] = useState<TimeDetails>(TiME_DETAILS.one);

  const handleDay = (
    event: React.MouseEvent<HTMLElement>,
    newDay: DayDetails | null,
  ) => {
    if(newDay !== null){
    setDay(newDay);
    }
  };

  const handleTime = (
    event: React.MouseEvent<HTMLElement>,
    newTime: TimeDetails | null,
  ) => {
    if(newTime !== null){
    setTime(newTime);
    }
  };


  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
      <Header />
      <Box sx={{marginTop: "48px"}} />
      <TabButton leftName={CAMPUS_MODE.LeftName} centerName={CAMPUS_MODE.CenterName} rightName={CAMPUS_MODE.RightName} value={mode} onChange={handleSwitch}/>
      <SelectTimeTable  mon={DAY_DETAILS.mon} tue={DAY_DETAILS.tue} wed={DAY_DETAILS.wed} thu={DAY_DETAILS.thu} fri={DAY_DETAILS.fri} one={TiME_DETAILS.one} two={TiME_DETAILS.two} three={TiME_DETAILS.three} four={TiME_DETAILS.four} five={TiME_DETAILS.five} six={TiME_DETAILS.six} timeValue={time} dayValue={day} timeOnChange={handleTime} dayOnChange={handleDay} />
      {/* <div>
        {rooms.map((room) => (
          // eslint-disable-next-line react/jsx-key
          <div>
            <h1>{room.aaa}</h1>
          </div>
        ))}
      </div> */}
      <div>
        {mode}キャンパスのページです<br />
        {day}曜日{time}時限目の空き教室を表示します

      </div>
      </main>
    </>
  );
}
