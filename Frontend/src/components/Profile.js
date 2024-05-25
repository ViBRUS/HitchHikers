import React, { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import {
  Container,
  Typography,
  Avatar,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Profile = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const classes = {};
  const user = {
    name: auth.name,
    email: auth.mail,
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  };

  return (
    <>
    <Navbar />
    <Container maxWidth="sm">
      <Card
        sx={{
          marginTop: 5,
          padding: 3,
          borderRadius: 15,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                alt={user.name}
                src={user.avatarUrl}
                sx={{
                  width: 100,
                  height: 100,
                  border: "2px solid #102B5F",
                }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5" component="div">
                {user.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {user.email}
              </Typography>
            </Grid>
          </Grid>
          <Typography
            variant="body1"
            sx={{
              marginTop: 2,
              color: "#555",
              fontStyle: "italic",
            }}
          >
            {user.bio}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
              backgroundColor: "#102B5F",
              "&:hover": {
                backgroundColor: "#5088f0",
              },
            }}
            onClick={() => navigate(-1)}
          >
            Back to the Dashboard
          </Button>
        </CardContent>
      </Card>
    </Container>
    </>
  );
};

export default Profile;
