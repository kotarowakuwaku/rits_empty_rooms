import React from "react";

interface DisplayRoomListProps {
  BuildingName: string[];
  BuildingNameObject: { [key: string]: boolean };
}

export default function DisplayRoomList({
  BuildingName = [],
  BuildingNameObject = {},
}: DisplayRoomListProps) {
  return BuildingName.map((CheckEmptyRoom: string, index: number) => {
    // const roomNumbers = CheckEmptyRoom.match(/\d+/g)?.[0] || "";
    return (
      <>
        {/* {parseFloat(roomNumbers) % 10 === 1 && index !== 0 ? <br /> : null} */}
        <div
          key={CheckEmptyRoom}
          style={{
            float: "left",
            margin: "0 5px",
            opacity: BuildingNameObject[CheckEmptyRoom] ? "1" : "0.1",
          }}
        >
          {BuildingNameObject[CheckEmptyRoom] ? (
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {CheckEmptyRoom}
            </div>
          ) : null}
        </div>
      </>
    );
  });
}
