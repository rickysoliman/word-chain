import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import axios, { AxiosError } from 'axios';

dotenv.config();
const app = express();
const port = process.env['PORT'] || 8080;

app.use(morgan('tiny'));
app.use(cors());
console.log('api key: ', process.env['WORDNIK_API_KEY']);

app.get('/dictionary/:word', async (req: Request, res: Response) => {
  const word = req.params['word'].toLowerCase();
  const dictionaryUrl = `http://api.wordnik.com/v4/word.json/${word}/definitions?api_key=${process.env['WORDNIK_API_KEY']}`;
  try {
    const { data } = await axios.get(dictionaryUrl);
    res.status(200).send(data);
    return;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError;
      if (error?.response?.status === 404) {
        console.log('not a word!');
        res.status(404).send('not a word!');
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
});

app.listen(port, () => {
  console.log(`Now listening at http://127.0.0.1:${port}`);
});

