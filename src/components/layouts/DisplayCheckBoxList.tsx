import React, { useState } from "react";
import CheckBoxRooms from "../elements/CheckBox";

interface DisplayRoomListProps {
  BuildingName: string[];
  BuildingNameObject: { [key: string]: boolean };
  submitBuildingName: (submitKey: string[]) => void;
}

export default function DisplayCheckboxRoomList({
  BuildingName = [],
  BuildingNameObject = {},
  submitBuildingName,
}: DisplayRoomListProps) {
  const [checkboxState, setCheckboxState] = useState<{
    [key: string]: boolean;
  }>(BuildingNameObject);
  const trueKeys = Object.keys(checkboxState).filter(
    (key) => checkboxState[key] === true,
  );
  const [checkboxStateKey, setCheckboxStateKey] = useState<string[]>(trueKeys);
  const handleCheckBox = (room: string) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [room]: !prevState[room], // 部屋の状態を反転させる
    }));
    const updatedKeys: string[] = checkboxState[room]
      ? checkboxStateKey.filter((key) => key !== room)
      : [...checkboxStateKey, room];

    setCheckboxStateKey(updatedKeys);

    submitBuildingName(updatedKeys);
  };

  return BuildingName.map((CheckEmptyRoom: string, index: number) => {
    const roomNumbers = CheckEmptyRoom.match(/\d+/g)?.[0] || "";

    return (
      <>
        <div
          key={CheckEmptyRoom}
          style={{
            float: "left",
            margin: "0 5px",
            opacity: checkboxState[CheckEmptyRoom] ? "1" : "0.1",
            clear:
              parseFloat(roomNumbers) % 10 === 1 && index !== 0
                ? "left"
                : undefined,
          }}
        >
          <CheckBoxRooms
            labelText={CheckEmptyRoom}
            confirmCheck={checkboxState[CheckEmptyRoom]}
            onClickCheckBox={() => handleCheckBox(CheckEmptyRoom)}
          />
        </div>
      </>
    );
  });
}
