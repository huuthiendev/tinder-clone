import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from './styles';
import { IUserInfo } from '../../models/user';
import { getMatchUsers } from '../../services/user.service';

const Matches = ({ loginInfo }: { loginInfo: any }) => {
  const [matchUsers, setMatchUsers] = useState<Array<IUserInfo>>([]);

  useEffect(() => {
    if (!matchUsers.length) getMatchUsers(loginInfo._id).then(data => setMatchUsers(data));
  }, []);

  return (
    <Grid container height={'100%'} width={'100%'} gap={4} justifyContent={'center'} overflow={'auto'}>
      {
        matchUsers.length ? matchUsers.map(user =>
          <Grid item md={6} xs={5}>
            <Card style={styles.card} className="card-info">
              <CardActionArea>
                <CardMedia
                  sx={{ height: '30vh' }}
                  component="img"
                  image={user.picture}
                  alt="avatar"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {user.firstName} {user.lastName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ) : (
          <React.Fragment>
            <Typography textAlign={'center'} marginTop={2}>
              Empty
            </Typography>
          </React.Fragment>
        )
      }
    </Grid>
  )
}

export default Matches;