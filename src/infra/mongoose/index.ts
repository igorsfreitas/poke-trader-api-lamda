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

        const databaseURI  = 'mongodb+srv://poke-trader-dev:88922974@cluster0.3u742.mongodb.net/poke-trader-dev?retryWrites=true&w=majority'
        
        //'mongodb://poke-trader-dev:88922974@cluster0.3u742.mongodb.net:27017/poke-trader-dev?ssl=true&authSource=admin&retryWrites=true&w=majority'
        
        //'mongodb://poke-trader-dev:88922974@cluster0.3u742.mongodb.net/poke-trader-dev?retryWrites=true&w=majority'
        
        // mongodb+srv://poke-trader-dev:<password>@cluster0.3u742.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

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