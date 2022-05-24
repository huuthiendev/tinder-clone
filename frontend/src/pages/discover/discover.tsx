import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, IconButton, LinearProgress } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState } from "react";
import styles from './styles';
import { IUser, IUserInfo } from '../../models/user';
import { getRandomUsers, getUserDetails, postReaction } from '../../services/user.service';

enum ReactionType {
  like = 1,
  pass = 2
}

const Discover = () => {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [currentUser, setCurrentUser] = useState<IUserInfo>();
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    getRandomUsers(page).then(data => setUsers(data));
  }, [page]);

  useEffect(() => {
    if (users.length && (!currentUser || (currentUser && currentUser.id !== users[0].id))) {
      getUserDetails(users[0].id).then((data) => {
        setCurrentUser(data)
      })
    }

    if (currentUser && users.length == 0) {
      setPage(page + 1);
    }
  }, [users]);

  const handlePass = () => {
    postReaction(users[0].id, users[0].id, ReactionType.pass);
    setUsers((prev: any) => prev.slice(1));
  }

  const handleLike = () => {
    postReaction(users[0].id, users[0].id, ReactionType.like);
    setUsers((prev: any) => prev.slice(1));
  }

  return (
    <Grid item height={'100%'}>
      {
        users.length ? (
          <React.Fragment>
            <Card style={styles.card} className="card-info">
              <CardActionArea>
                <CardMedia
                  sx={{ height: '55vh' }}
                  component="img"
                  image={users[0].picture}
                  alt="avatar"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {users[0].firstName} {users[0].lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentUser && (new Date().getFullYear() - new Date(currentUser.dateOfBirth).getFullYear())}
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
          <React.Fragment>
            <LinearProgress />
            <Typography textAlign={'center'} marginTop={2}>
              Loading ...
            </Typography>
          </React.Fragment>
        )
      }
    </Grid>
  )
}

export default Discover;