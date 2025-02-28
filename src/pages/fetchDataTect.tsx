import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";

const fetchDataTect = () => {
  const [data, setData] = useState<Record<string, any[]>>({});

  const groupByKey = <T, K extends keyof T>(
    array: T[],
    key: K,
  ): Record<string, T[]> =>
    array.reduce(
      (acc, item) => {
        const groupKey = String(item[key]);
        acc[groupKey] = acc[groupKey] ?? [];
        acc[groupKey].push(item);
        return acc;
      },
      {} as Record<string, T[]>,
    );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: roomsData, error: roomsError } = await supabase
          .from("rooms")
          .select("*");

        if (roomsError) {
          throw roomsError;
        }
        console.log(groupByKey(roomsData, "building_id"));
        setData(groupByKey(roomsData, "building_id") || {});
      } catch (error) {
        console.log("error", error);
        setData({});
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Fetch Data Test</h1>
      <ul>
        {Object.keys(data).map((key) => (
          <li key={key}>
            <h2>{key}</h2>
            <ul>
              {data[key].map((room) => (
                <li key={room.id}>{room.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

export default fetchDataTect;
