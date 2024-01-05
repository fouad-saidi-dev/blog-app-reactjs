import { Box, CircularProgress } from "@mui/material";

const ProgressCircul = ({condition}) => {
  
  if (condition == 0 ) {
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
