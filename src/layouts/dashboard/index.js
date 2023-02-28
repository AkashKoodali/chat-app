import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { Gear } from "phosphor-react";

import { useTheme } from "@mui/material/styles";
import { Avatar, Box, Divider, IconButton, Stack } from "@mui/material";

import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons } from "../../data";
import AntSwitch from "../../components/AntSwitch";

import useSettings from "../../hooks/useSettings";

const DashboardLayout = () => {
  const theme = useTheme();

  const [selected, setSelected] = useState(0);

  const { onToggleMode } = useSettings();

  return (
    <>
      <Stack direction="row">
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            height: "100vh",
            width: 100,
          }}
          p={2}
        >
          <Stack
            direction="column"
            sx={{ height: "100%" }}
            alignItems="center"
            spacing={3}
            justifyContent="space-between"
          >
            <Stack alignItems="center" spacing={4}>
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  height: 64,
                  width: 64,
                  borderRadius: 1.5,
                }}
              >
                <img src={Logo} alt="logo" />
              </Box>

              <Stack
                spacing={3}
                sx={{ width: "max-content" }}
                direction="column"
                alignItems="center"
              >
                {Nav_Buttons.map((el) =>
                  el.index === selected ? (
                    <Box
                      p={1}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 1.5,
                      }}
                      key={el.index}
                    >
                      <IconButton
                        sx={{ width: "max-content", color: "#fff" }}
                        
                      >
                        {el.icon}
                      </IconButton>
                    </Box>
                  ) : (
                    <IconButton
                      onClick={() => setSelected(el.index)}
                      sx={{
                        width: "max-content",
                        color:
                          theme.palette.mode === "light"
                            ? "#000"
                            : theme.palette.text.primary,
                      }}
                      key={el.index}
                    >
                      {el.icon}
                    </IconButton>
                  )
                )}
                <Divider sx={{ width: "48px" }} />
                {selected === 3 ? (
                  <Box
                    p={1}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}
                  >
                    <IconButton sx={{ width: "max-content", color: "#fff" }}>
                      <Gear />
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    onClick={() => setSelected(3)}
                    sx={{
                      width: "max-content",
                      color:
                        theme.palette.mode === "light"
                          ? "#000"
                          : theme.palette.text.primary,
                    }}
                  >
                    <Gear />
                  </IconButton>
                )}
              </Stack>
            </Stack>

            <Stack spacing={4}>
              <AntSwitch onClick={() => onToggleMode()} />
              <Avatar src={faker.image.avatar()} />
            </Stack>
          </Stack>
        </Box>

        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;
