import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'proposal',
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
