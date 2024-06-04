import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ToggleButton, { ToggleButtonProps } from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { DayTimeTable } from "@/types/DayTimeTable";

interface TabButtonProps extends DayTimeTable {
  dayValue: string;
  dayOnChange?: ToggleButtonProps["onChange"];
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: "1px solid",
  },
}));

const buttonStyle = {
  margin: "0",
  padding: "0",
  width: "96px",
  height: "39px",
  fontSize: "1.5rem",
};

export default function TimeTableToggleButton({
  mon = "",
  tue = "",
  wed = "",
  thu = "",
  fri = "",
  dayValue = "",
  dayOnChange = () => {},
}: TabButtonProps) {
  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          border: "1px solid",
          flexWrap: "wrap",
          width: "fit-content",
          justifyContent: "center",
          margin:"0 10px",
        }}
      >
        <StyledToggleButtonGroup
          value={dayValue}
          exclusive
          onChange={dayOnChange}
          aria-label="text alignment"
        >
          <ToggleButton value={mon} aria-label="mon" sx={buttonStyle}>
            月
          </ToggleButton>
          <ToggleButton value={tue} aria-label="tue" sx={buttonStyle}>
            火
          </ToggleButton>
          <ToggleButton value={wed} aria-label="wed" sx={buttonStyle}>
            水
          </ToggleButton>
          <ToggleButton value={thu} aria-label="thu" sx={buttonStyle}>
            木
          </ToggleButton>
          <ToggleButton value={fri} aria-label="fri" sx={buttonStyle}>
            金
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}
