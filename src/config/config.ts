import * as fs from 'fs';

const TIMES: { [key: string]: number } = {
  d: 24 * 60 * 60,
  m: 60 * 60,
  s: 60,
};

const PUBLIC_KEY = fs.readFileSync('public.key.pub', { encoding: 'utf8', flag: 'r' });
const PRIVATE_KEY = fs.readFileSync('private.key', { encoding: 'utf8', flag: 'r' });

export default () => {
  // converts "30d" to ["30", "d"]
  const match = process.env.TOKEN_EXPIRE.match(/(\d){1,}|(\w)/g);

  const time = Number(match[0]);
  const type = match[1];

  return {
    keys: {
      privateKey: PRIVATE_KEY,
      publicKey: PUBLIC_KEY,
      expiresIn: time * TIMES[type],
    },
  };
};
