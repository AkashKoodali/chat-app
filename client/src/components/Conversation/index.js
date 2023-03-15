import React from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";

function Conversation() {
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* chat header */}
      <Header />

      {/* Msg */}
      <Box width={"100%"} sx={{ flexGrow: 1, height: "100%", overflow:"scroll" }}>
        <Message menu={true} />
      </Box>

      {/* chat footer */}
      <Footer />
    </Stack>
  );
}

export default Conversation;
