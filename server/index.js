const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { MONGO_URL, JWT_REFRESH_KEY } = require("./config");
const problem = require("./graphql/typeDefs/problem");
const user = require("./graphql/typeDefs/user");
const resolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");
const cors = require("cors");
const User = require("./models/User");
const {
  sendRefreshToken,
  createAccessToken,
  createRefreshToken,
} = require("./utils/auth");
const { verify } = require("jsonwebtoken");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/uploads", express.static(__dirname));
app.use(isAuth);

app.post("/refresh_token", async (req, res) => {
  const token = req.cookies["refreshToken"];
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload;
  try {
    payload = verify(token, JWT_REFRESH_KEY);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  // valid token, hence send Access Token
  const user = await User.findById(payload.userID);

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }
  // sendRefreshToken(res, createRefreshToken(user));
  res.cookie("refreshToken", createRefreshToken(user), {
    httpOnly: true,
    path: "/refresh_token",
  });
  return res.send({ ok: true, accessToken: createAccessToken(user) });
});

const server = new ApolloServer({
  typeDefs: [problem, user],
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

server.applyMiddleware({ app, cors: false });

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected...");
    return app.listen({ port: PORT });
  })
  .then(() => {
    console.log(`Server is ready at : ${PORT}`);
  })
  .catch((err) => console.log(err));
