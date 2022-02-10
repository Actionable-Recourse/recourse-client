import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const headersData = [
    {
      label: "ABOUT US",
      href: "/about",
    },
  ];

export default function Header() {
  const displayDesktop = () => {
    return (
        <Toolbar>
            <Button
            {...{
                key: "HONE",
                color: "inherit",
                to: "/",
                component: RouterLink,
            }}
            >
            {<Typography variant="h6" component="h1">Home</Typography>}
            </Button>
            {getMenuButtons()}
        </Toolbar>
    );
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
          }}
        >
          {label}
        </Button>
      );
    });
  };
  
  return (
    <header className="App-header">
        <AppBar>{displayDesktop()}</AppBar>
        <br></br>
        <br></br>
    </header>
  );
}