import { Box, Stack, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Contact from "../../components/Contact";
import Conversation from "../../components/Conversation";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import Chats from "./Chats";

const GeneralApp = () => {
  const theme = useTheme();
  const  sidebar  = useSelector((store) => store.app.sidebar);
  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* chats */}
        <Chats />

        <Box
          sx={{
            height: "100%",
            width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
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
        {sidebar.open &&
          (() => {
            switch (sidebar.type) {
              case "CONTACT":
                return <Contact />;

              case "STARRED":
                 return <StarredMessages />

              case "SHARED":
                return <SharedMessages />;
                // return <Media />;

              default:
                break;
            }
          })()}
      </Stack>
    </>
  );
};

export default GeneralApp;
