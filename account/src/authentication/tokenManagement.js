/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET_KEY;

const createTokenJWT = (user) => {
  const payload = {
    id: user._id
  };

  const token = jwt.sign(payload, SECRET);
  return token;
};

const validadeTokenJWT = (token) => {
  const result = jwt.verify(token, SECRET);
  return result;
};

export { createTokenJWT, validadeTokenJWT };
