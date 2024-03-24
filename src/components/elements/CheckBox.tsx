import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface CheckBoxProps {
  confirmCheck: boolean;
  labelText: string;
  onClickCheckBox?: () => void;
}

export default function CheckboxRooms({
  labelText = "",
  confirmCheck = false,
  onClickCheckBox = () => {},
}: CheckBoxProps) {
  return (
    <>
      <FormControlLabel
        control={<Checkbox checked={confirmCheck} onChange={onClickCheckBox} />}
        label={labelText}
        sx={{ display: "inline-block" }}
      />
    </>
  );
}
