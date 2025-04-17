import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <Grid>
      <Grid
        container
        spacing={2}
        mt={2}
        // ml={0}
        sx={{
          justifyContent: "space-around",
          backgroundColor: "#f1ebd6",
        }}
      >
        <Grid
          item
          md={5}
          lg={4}
          xs={12}
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            mt={3}
            sx={{
              fontSize: "13px",
              fontFamily: "Pacifico, cursive",
              fontWeight: 300,
            }}
          >
            "Find the perfect spare parts effortlessly with our user-friendly
            platform. Browse, order, and track high-quality auto components for
            all vehicle types—anytime, anywhere." Let me know if you need any
            tweaks! Social Media
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mt: 2,
            }}
          >
            <IconButton
              sx={{
                backgroundColor: "#09a5c4",
                height: "35px",
                width: "35px",
                color: "whitesmoke",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "#09a5c4",
                height: "35px",
                width: "35px",
                color: "whitesmoke",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "#09a5c4",
                height: "35px",
                width: "35px",
                color: "whitesmoke",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "#09a5c4",
                height: "35px",
                width: "35px",
                color: "whitesmoke",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              <YouTubeIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item md={1.5}>
          <Typography variant="body1">Learn</Typography>
          <List
            sx={{
              fontSize: "14px",
            }}
          >
            <ListItem>Home</ListItem>
            <ListItem>Blogs</ListItem>
            <ListItem>Spare</ListItem>
            <ListItem>Features</ListItem>
            <ListItem>Pricing</ListItem>
            <ListItem>Indistries</ListItem>
          </List>
        </Grid>
        <Grid item md={2.5}>
          <Typography variant="body1">Indistres</Typography>
          <List
            sx={{
              fontSize: "13px",
            }}
          >
            <ListItem>Automotive Repair Shops</ListItem>
            <ListItem>Car Enthusiasts & modifiers</ListItem>
          </List>
        </Grid>
        <Grid item md={2.5}>
          <Typography variant="body1">Useful Links</Typography>
          <List
            sx={{
              fontSize: "14px",
            }}
          >
            <ListItem>Contacts us </ListItem>
            <ListItem>About us </ListItem>
            <ListItem>Our Clints </ListItem>
            <ListItem>Careers</ListItem>
            <ListItem>Become an agency partner</ListItem>
            <ListItem>Terms and conditions </ListItem>
            <ListItem>Privacy and Policy </ListItem>
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
