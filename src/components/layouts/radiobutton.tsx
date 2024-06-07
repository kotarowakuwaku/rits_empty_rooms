import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function ControlledRadioButtonsGroup() {
  const [value, setValue] = React.useState("bkc");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="kic"
          control={<Radio />}
          label="衣笠キャンパス(KIC)"
        />
        <FormControlLabel
          value="oic"
          control={<Radio />}
          label="大阪茨木キャンパス(OIC)"
        />
        <FormControlLabel
          value="bkc"
          control={<Radio />}
          label="びわこ・くさつキャンパス(BKC)"
        />
      </RadioGroup>
    </FormControl>
  );
}
