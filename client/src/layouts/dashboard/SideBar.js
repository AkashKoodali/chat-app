import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { Gear } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Stack } from "@mui/material";

import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Profile_Menu } from "../../data";
import AntSwitch from "../../components/AntSwitch";

import useSettings from "../../hooks/useSettings";

const SideBar = () => {
  const theme = useTheme();

  const [selected, setSelected] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { onToggleMode } = useSettings();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === "light"
        ? "#F0F4FA"
        : theme.palette.background.default,
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
                  <IconButton sx={{ width: "max-content", color: "#fff" }}>
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
          <Avatar src={faker.image.avatar()} 
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}/>
          {/*  */}
          <Menu
    id="basic-menu"
    aria-labelledby="basic-button"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: "bottom",
      horizontal:"left"
    }} >
      <Stack spacing={1} p={1}>
      {Profile_Menu.map((el) => (
        <MenuItem onClick={() => handleClick}>
          <Stack sx={{width: 100}} direction="row" alignItems={"center"} justifyContent="space-between">
            <span>{el.title}</span>
          {el.icon}
            </Stack></MenuItem>
      ))}
      </Stack>
      
    </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
