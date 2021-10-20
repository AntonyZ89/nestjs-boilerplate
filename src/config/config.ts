enum times {
  d = 24 * 60 * 60,
  m = 60 * 60,
  s = 60,
}

export default () => {
  // converts "30d" to ["30", "d"]
  const match = process.env.TOKEN_EXPIRE.match(/(\d){1,}|(\w)/g);

  const time = Number(match[0]);
  const type = match[1];

  return {
    keys: {
      privateKey: process.env.PRIVATE_KEY,
      publicKey: process.env.PUBLIC_KEY,
      expiresIn: time * times[type],
    },
  };
};
