const dbConnectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}-wgif5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const dbConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = { dbConnectionUrl, dbConnectionOptions };
