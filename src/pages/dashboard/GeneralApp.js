import { Box, Stack, useTheme } from "@mui/material";
import React from "react";
import Conversation from "../../components/Conversation";
import Chats from "./Chats";

const GeneralApp = () => {
  const theme = useTheme();
  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* chats */}
        <Chats />

        <Box
          sx={{
            height: "100%",
            width: "calc(100vw - 420px)",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F0F4FA"
                : theme.palette.background.default,
          }}
        >
          {/* Conversation */}
          <Conversation />
        </Box>
        {/* contact */}
      </Stack>
    </>
  );
};

export default GeneralApp;
