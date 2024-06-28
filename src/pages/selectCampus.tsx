import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "@/components/layouts/Header";
import { Box } from "@mui/material";
import { CAMPUS_MODE, type CampusMode } from "@/types/CampusMode";
import ControlledRadioButtonsGroup from "@/components/layouts/radiobutton";
import Image from "next/image";
import { useRouter } from "next/router";

// const inter = Inter({ subsets: ["latin"] });

export default function SelectCampus() {
  const router = useRouter();

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

  useEffect(() => {
    if (router.query.campus != undefined) {
      setCampus(router.query.campus as CampusMode);
    }
  }, []);

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
        <Header campus={campus} />
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
            margin: "20px 0",
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
            zIndex: "700",
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
            right: 30,
            width: "40%",
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
