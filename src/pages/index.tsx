import Head from "next/head";
import { Inter } from "next/font/google";
import db from "@/lib/firebase/firebase";
import { useEffect, useState } from "react";
import {collection, getDocs} from 'firebase/firestore';
import  Header  from "@/components/layouts/Header";
import TabButton from "@/components/elements/TabButton"
import { Box } from "@mui/material";
import SelectTimeTable from "@/components/elements/SelectTimeTable";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [rooms, setRooms] = useState([]);

  useEffect(()=>{
    const roomData = collection(db,"rooms");
    getDocs(roomData).then((snapShot)=>{
      // console.log(snapShot.docs.map((doc)=>({...doc.data()})));
      setRooms(snapShot.docs.map((doc) => ({...doc.data() })));
    });
  },[]);
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
      <Header />
      <Box sx={{marginTop: "48px"}}>

      </Box>
      <TabButton />
      <SelectTimeTable />
      {/* <div>
        {rooms.map((room) => (
          // eslint-disable-next-line react/jsx-key
          <div>
            <h1>{room.aaa}</h1>
          </div>
        ))}
      </div> */}
      </main>
    </>
  );
}
