import * as express from 'express';
import type { Request, Response } from 'express';
// import * as path from 'path';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import axios, { AxiosError } from 'axios';

type ResponseData = {
  isValid: boolean;
  firstDefinition: string;
}

dotenv.config();
const app = express();
const port = process.env['PORT'] || 8080;

app.use(morgan('tiny'));
app.use(cors());

app.get('/validity/:word', async (req: Request, res: Response) => {
  const word = req.params['word'];
  const dictionaryUrl = `http://api.wordnik.com/v4/word.json/${word}/definitions?api_key=${process.env['WORDNIK_API_KEY']}`;
  const profanityUrl = `https://www.purgomalum.com/service/containsprofanity?text=${word}`;
  let dictRes: {}[];
  let profanityRes: boolean | Error;
  try {
    const { data } = await axios.get(dictionaryUrl);
    dictRes = data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError;
      if (error?.response?.status === 404) {
        res.status(404).send(false);
        return;
      } else {
        res
          .status(error?.response?.status || 500)
          .send('An error occurred with the dictionary API');
        return;
      }
    } else {
      res.status(500).send('An unkown server error occurred');
      return;
    }
  }
  try {
    const { data } = await axios.get(profanityUrl);
    profanityRes = data;
    if (profanityRes === false) {
      res.status(200).send(true);
      return;
    }
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError;
      res
        .status(error?.response?.status || 500)
        .send('An error occurred while checking for profanity');
      return;
    } else {
      res.status(500).send('An unkown server error occurred');
      return;
    }
  }
});

app.listen(port, () => {
  console.log(`Now listening at http://127.0.0.1:${port}`);
});
