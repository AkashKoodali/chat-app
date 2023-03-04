import { faker } from "@faker-js/faker";
import { Box, Grid, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Shared_docs, Shared_links } from "../data";
import { UpdateSidebarType } from "../redux/slices/app";
import { DocMsg, LinkMsg } from "./Conversation/MsgTypes";

const SharedMessages = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
            <Typography variant="subtitle2">Shared messages</Typography>
          </Stack>
        </Box>

        <Tabs
          sx={{
            px: 2,
            pt: 2,
          }}
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>

        {/* body */}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflow: "scroll",
          }}
          p={3}
          spacing={value === 1 ? 1 : 3}
        >
          {(() => {
            switch (value) {
              case 0:
                //  Images
              return  <Grid container spacing={2}>
                  {
                    [ 0, 1, 2, 3, 4, 5, 6 ].map((el) => (
                      <Grid item xs={4} >
                        <img src={faker.image.avatar()} alt={faker.name.fullName()} />
                      </Grid>
                    ))
                  }
                </Grid>
               
              case 1:
                // Links
                return Shared_links.map((el) => <LinkMsg el={el} />)
              case 2:
                // Docs
                return Shared_docs.map((el) => <DocMsg el={el} /> )
            
              default:
                break;
            }
          })()}
        </Stack>

      </Stack>
    </Box>
  );
};

export default SharedMessages;
