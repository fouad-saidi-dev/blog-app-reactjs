import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

const ProgressCircul = (props) => {
  
  if (props.condition == 0 ) {
    return (
      <div>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "15%" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }
};

export default ProgressCircul;
