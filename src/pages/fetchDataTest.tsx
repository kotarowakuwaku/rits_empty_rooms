import React, { useEffect, useState } from "react";
import { fetchSupabaseData } from "@/lib/supabase/fetch_supabaseData_test";
import { fetchCampusesData } from "@/lib/supabase/fetchCampusData";

const FetchDataTest = () => {
  const [data, setData] = useState<Record<string, any[]>>({});
  const [campuses, setCampuses] = useState<any[]>([]);

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
      const roomsData = await fetchSupabaseData();
      if (roomsData) {
        console.log(roomsData);
        setData(groupByKey(roomsData, "building_id"));
      }
      const campusesData = await fetchCampusesData();
      if (campusesData) {
        console.log(campusesData);
        setCampuses(campusesData);
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

export default FetchDataTest;
