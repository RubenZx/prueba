import { Box } from "@material-ui/core";
import React from "react";

const CenteredComponent = ({ children }: { children: React.ReactNode }) => (
  <Box
    display="flex"
    alignItems="center"
    minHeight="80vh"
    justifyContent="center"
  >
    {children}
  </Box>
);

export default CenteredComponent;
