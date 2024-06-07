import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { CampusMode } from "@/types/CampusMode";

interface RadioButtonProps {
  campus: string;
  onClickRadioButton?: RadioGroupProps["onChange"];
}

export default function ControlledRadioButtonsGroup({
  campus = "",
  onClickRadioButton = () => {},
}: RadioButtonProps) {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={campus}
        onChange={onClickRadioButton}
      >
        <FormControlLabel
          value="KIC"
          control={<Radio />}
          label="衣笠キャンパス(KIC)"
        />
        <FormControlLabel
          value="OIC"
          control={<Radio />}
          label="大阪茨木キャンパス(OIC)"
        />
        <FormControlLabel
          value="BKC"
          control={<Radio />}
          label="びわこ・くさつキャンパス(BKC)"
        />
      </RadioGroup>
    </FormControl>
  );
}
