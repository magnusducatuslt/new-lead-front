import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Fab from "@mui/material/Fab";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Uploader from "../../components/upload/upload";
import FlagIcon from "@mui/icons-material/Flag";
import axios from "axios";
import img from "../../imgs/course-img.png";
import { useNavigate } from "react-router-dom";

import { green } from "@mui/material/colors";

const URL = "http://localhost:7890";
const actions = [
  { icon: <MenuBookIcon />, name: "Courses" },
  { icon: <SettingsIcon />, name: "Settings" },
  {
    icon: (
      <LogoutIcon
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      />
    ),
    name: "Logout",
  },
];

export default function Consumer({ consumerId }) {
  const [contents, setContents] = useState([]);
  const [state, setState] = useState();
  const [path, setPath] = useState();
  useEffect(() => {
    const fetchResults = async () => {
      const response = await axios.post(`${URL}/content`, { consumerId });
      console.log(response.data);
      setContents([...response.data]);
    };
    fetchResults().then();
  }, [state]);

  if (path) {
    window.location.href = `${URL}/render/${path}`;
  }
  return (
    <div>
      <div className="header">
        <SpeedDial
          direction="down"
          ariaLabel="SpeedDial basic example"
          icon={<MenuIcon />}
          FabProps={{
            sx: {
              bgcolor: green[700],
              "&:hover": {
                bgcolor: green[600],
              },
            },
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
          ))}
        </SpeedDial>
        <h2>Welcome: consumer!</h2>
        <Avatar
          className="avatar"
          sx={{
            bgcolor: green[700],
            zoom: 1.2,
            "&:hover": {
              bgcolor: green[600],
            },
          }}
        />
      </div>
      <div className="content">
        <h2 className="section-ttl">Courses</h2>
        <div className="content-courses">
          {contents.map((result) => (
            <Card key={result.id} sx={{ maxWidth: 345 }}>
              <CardMedia component="img" alt="course img" height="140" image={img} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {result.originalname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Created at: {result.createdAt}
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="success" size="small">
                  Share
                </Button>
                <Button color={result.results.filter(el => el.passed).length ? "success" : "error"} size="small">
                  {result.results.filter(el => el.passed).length ? "Passed" : "Failed"}
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
      <div className="achievements">
        <h2 className="section-ttl">Achievements</h2>
        <div className="achievements-content">
          <div className="achievements-item">
            <Fab color="success" aria-label="great-start">
              <FlagIcon />
            </Fab>
            <span>Great start!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
