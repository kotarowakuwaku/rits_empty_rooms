import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { CampusMode } from "@/types/CampusMode";
import { Campus } from "@/types/Campus";

interface RadioButtonProps {
  campuses: Campus[];
  selectedCampus: string;
  onClickRadioButton?: RadioGroupProps["onChange"];
}

export default function ControlledRadioButtonsGroup({
  campuses,
  selectedCampus = "",
  onClickRadioButton = () => {},
}: RadioButtonProps) {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={selectedCampus}
        onChange={onClickRadioButton}
      >
        {campuses.map((campus) => (
          <FormControlLabel
            key={campus.id}
            value={campus.name}
            control={<Radio />}
            label={`${campus.official_name}(${campus.name})`}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
