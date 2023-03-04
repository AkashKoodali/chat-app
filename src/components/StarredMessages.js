import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { useDispatch } from "react-redux";
import { UpdateSidebarType } from "../redux/slices/app";
import Message from "./Conversation/Message";


const StarredMessages = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 320,
        height: "100vh",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction="row"
            spacing={3}
            alignItems="center"
          >
            <IconButton onClick={() => dispatch(UpdateSidebarType("CONTACT"))}>
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Starred messages</Typography>
          </Stack>
        </Box>

        {/* body */}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflow: "scroll",
          }}
          p={3}
          spacing={3}
        >
        <Message />
        </Stack>

      </Stack>
    </Box>
  );
};

export default StarredMessages;
