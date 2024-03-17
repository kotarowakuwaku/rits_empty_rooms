import Head from "next/head";
import { Inter } from "next/font/google";
import db from "@/lib/firebase/firebase";
import { SyntheticEvent, useEffect, useState } from "react";
import {collection, getDocs} from 'firebase/firestore';
import  Header  from "@/components/layouts/Header";
import TabButton from "@/components/elements/TabButton"
import { Box } from "@mui/material";
import SelectTimeTable from "@/components/elements/ToggleButton";
import { CAMPUS_MODE, type CampusMode } from "@/types/CampusMode";

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

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
      <Header />
      <Box sx={{marginTop: "48px"}} />
      <TabButton leftName={CAMPUS_MODE.LeftName} centerName={CAMPUS_MODE.CenterName} rightName={CAMPUS_MODE.RightName} value={mode} onChange={handleSwitch}/>
      <SelectTimeTable />
      {/* <div>
        {rooms.map((room) => (
          // eslint-disable-next-line react/jsx-key
          <div>
            <h1>{room.aaa}</h1>
          </div>
        ))}
      </div> */}
      <div>
        {mode}キャンパスのページです
      </div>
      </main>
    </>
  );
}
