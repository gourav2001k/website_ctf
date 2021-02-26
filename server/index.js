const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGO_URL } = require("./config");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers.js");

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected...");
        return server.listen({ port: PORT });
    })
    .then(({ url }) => {
        console.log(`Server is ready at : ${url}`);
    })
    .catch((err) => console.log(err));