const dbConnectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-cip9r.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const dbConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = { dbConnectionUrl, dbConnectionOptions };
