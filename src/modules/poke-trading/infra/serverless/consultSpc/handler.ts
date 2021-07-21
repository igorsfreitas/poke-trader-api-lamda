import 'source-map-support/register'
import * as mongoose from 'mongoose'
import secretsManager from '@middy/secrets-manager'
import { middyfy } from '@libs/lambda'
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import middyMongooseConnector from '../../../../../infra/serverless/middlewares/mongoose'
import { consultSpcController } from '../../../useCases/consultSpc'

const handler: ValidatedEventAPIGatewayProxyEvent<{}> = async event => consultSpcController.execute(event)

export default middyfy(handler)
    .use(secretsManager({
        secrets: {
            MONGO_SECRET: `${process.env.ENV}/3rd/mongodb`
        }
      }))
    .use(middyMongooseConnector({
        mongoose,
        databaseURIPath: 'MONGO_SECRET'
    }))
