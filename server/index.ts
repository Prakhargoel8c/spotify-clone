import express, { Application } from 'express';
import cors from 'cors';
import SpotifyWepApi from 'spotify-web-api-node';
import 'dotenv/config';
const app: Application = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/', async (req, res) => {
  return res.status(200).send({
    message: 'Hello World!',
  });
});

app.post('/login', async (req, res) => {
  try {
    const code: string = req.body.code;
    const spotifyApi = new SpotifyWepApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token: accessToken, expires_in: expiresIn, refresh_token: refreshToken } = data.body;
    res.json({ accessToken, refreshToken, expiresIn });
  } catch (e) {
    res.sendStatus(401);
  }
});

app.post('/refresh-token', async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWepApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken,
    });
    const data = await spotifyApi.refreshAccessToken();
    const { access_token: accessToken, expires_in: expiresIn } = data.body;
    res.json({ accessToken, refreshToken, expiresIn });
  } catch (e) {
    res.sendStatus(401);
  }
});

app.listen(port);
