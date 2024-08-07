import Header from "@/components/layouts/Header";
import { Box } from "@mui/material";
import Image from "next/image";
import Head from "next/head";
import { CampusMode, CAMPUS_MODE } from "@/types/CampusMode";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Document() {
  const [campus, setCampus] = useState<CampusMode>(CAMPUS_MODE.LeftName);

  useEffect(() => {
    if (router.query.campus != undefined) {
      setCampus(router.query.campus as CampusMode);
    }
  }, []);
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Header campus={campus} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <h3>作成中の画面です</h3>
        </Box>
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
