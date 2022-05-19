import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState } from "react";
import styles from './styles';
import axios from "axios";

interface IUser {
  firstName: string;
  id: string;
  lastName: string;
  picture: string;
  title: string;
}

const Discover = () => {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [page, setPage] = useState<number>(0);
  const limit = 20;

  useEffect(() => {
    if (!users.length) {
      getRandomUsers();
    }
  }, []);

  useEffect(() => {
    getRandomUsers();
  }, [page])

  const getRandomUsers = async () => {
    const data = await axios.get(`https://dummyapi.io/data/v1/user?limit=${limit}&&page=${page}`, {
      headers: {
        "app-id": "628582515b894e140b9a5c04"
      }
    });
    setUsers(data.data.data);
  }

  const handlePass = () => {
    setUsers((prev: any) => prev.slice(1));

    if (users.length == 1) {
      setPage(page + 1);
    }
  }

  const handleLike = () => {
    setUsers((prev: any) => prev.slice(1));

    if (users.length == 1) {
      setPage(page + 1);
    }
  }

  return (
    <Grid item height={'100%'}>
      {
        users.length ? (
          <React.Fragment>
            <Card style={styles.card}>
              <CardActionArea>
                <CardMedia
                  sx={{ height: '100%' }}
                  component="img"
                  image={users[0].picture}
                  alt="avatar"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {users[0].firstName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {users[0].title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Grid container justifyContent={'center'} alignItems={'center'} gap={20} height={'20%'}>
              <Grid item alignItems={'center'} textAlign={'center'} borderRadius={'50%'} style={styles.btnPass}>
                <IconButton size="large" onClick={handlePass}>
                  <ClearIcon style={{ color: 'white' }} fontSize={'large'} />
                </IconButton>
              </Grid>
              <Grid item alignItems={'center'} textAlign={'center'} borderRadius={'50%'} style={styles.btnLike}>
                <IconButton size="large" onClick={handleLike}>
                  <FavoriteIcon style={{ color: 'white' }} fontSize={'large'} />
                </IconButton>
              </Grid>
            </Grid>
          </React.Fragment>
        ) : (
          <Typography variant="body1">
            Looks like you don't have anyone to reach =))
          </Typography>
        )
      }
    </Grid>
  )
}

export default Discover;