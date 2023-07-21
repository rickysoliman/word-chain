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

interface apiDefinition {
  id: string
  partOfSpeech: string
  text: string
  similarWords: string[]
  exampleUses: {text: string}[]
}

interface responseDefinition {
  id: string
  partOfSpeech: string
  definition: string
  synonyms: string[]
  example: string
}

app.get('/dictionary/:word', async (req: Request, res: Response) => {
  const word = req.params['word'].toLowerCase();
  const dictionaryUrl = `http://api.wordnik.com/v4/word.json/${word}/definitions?api_key=${process.env['WORDNIK_API_KEY']}`;
  try {
    // const { data } = await axios.get(dictionaryUrl) as { data: apiDefinition[] };
    // const results = data;
    const { data } = await axios.get(dictionaryUrl) as { data: apiDefinition[] };
    let results = data.map((def: apiDefinition): responseDefinition => ({
      id: def.id,
      partOfSpeech: def.partOfSpeech,
      definition: def.text,
      synonyms: def.similarWords,
      example: def.exampleUses.map((example: {text: string}): string => example.text)[0],
    }));
    results = results.filter((def: responseDefinition): boolean => def.definition !== undefined && def.partOfSpeech !== undefined);
    res.status(200).send(results);
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

