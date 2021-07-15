const logger = require('pino')()

export default ({
    mongoose,
    databaseURIPath,
    connectionOpts = {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    shouldClose = false,
    shouldLog = true
  }) => ({
    before: async (handler) => {

        handler.context.callbackWaitsForEmptyEventLoop = false

        const { URI: databaseURI } = handler.context[databaseURIPath]

        if (mongoose.connection.readyState === 1) {
            logger.info('=> Using existing database connection')
        } else {
            logger.info('=> Creating new database connection')
            await mongoose.connect(databaseURI, connectionOpts)
        }

        delete handler.context[databaseURIPath]

    },
    after: async () => {
        if (shouldClose && mongoose.connection.readyState !== 0) {
            logger.info('=> Closing database connection')
            await mongoose.connection.close()
        }
    }
})