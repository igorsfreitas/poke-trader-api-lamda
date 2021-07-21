import 'source-map-support/register';
import * as mongoose from 'mongoose'
import middyMongooseConnector from '../../infra/mongoose'
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { addProposalController } from '../../modules/poke-trading/useCases/addProposal'

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => await addProposalController.execute(event)

export const main = middyfy(handler)
    .use(middyMongooseConnector({
        mongoose,
        databaseURIPath: 'mongodb://poke-trader-dev:88922974@cluster0-shard-00-00.3u742.mongodb.net:27017,cluster0-shard-00-01.3u742.mongodb.net:27017,cluster0-shard-00-02.3u742.mongodb.net:27017/poke-trader-dev?ssl=true&replicaSet=atlas-fp4eyr-shard-0&authSource=admin&retryWrites=true&w=majority'
    }))
