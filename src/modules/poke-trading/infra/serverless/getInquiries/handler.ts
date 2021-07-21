import 'source-map-support/register'
import * as mongoose from 'mongoose'
import secretsManager from '@middy/secrets-manager'
import { middyfy } from '@libs/lambda'
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import middyMongooseConnector from '../../../../../infra/serverless/middlewares/mongoose'
import { getInquiriesController } from '../../../useCases/getInquiries'

const handler: ValidatedEventAPIGatewayProxyEvent<{}> = async event => getInquiriesController.execute(event)

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
