import 'source-map-support/register'

export abstract class BaseController {

  public req: any
  public res: any

  protected abstract executeImpl (req: any, ctx?: any): Promise<void | any>

  public async execute (req: any, ctx?: any): Promise<any> {
    return await this.executeImpl(req, ctx)
  }

  public static jsonResponse<T> ({ res, statusCode, message, req }: { res?: T; statusCode: number; message?: string; req?: any }) {
    const lambdaResponse = {
      body: JSON.stringify(res ?? { message, event: req }),
      statusCode: statusCode ?? 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' :'*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH'
      }
    }
    return lambdaResponse
  }

  public ok<T> (dto?: T) {
    if (!!dto) {
      return BaseController.jsonResponse<T>({ res: dto, statusCode: 200 })
    } else {
      return BaseController.jsonResponse<T>({ statusCode: 200 })
    }
  }

  public created () {
    return BaseController.jsonResponse({ statusCode: 201, res: {} })
  }

  public clientError (message?: string) {
    return BaseController.jsonResponse({ res: this.res, statusCode: 400, message: message ? message : 'Unauthorized', req: this.req })
  }

  public unauthorized (message?: string) {
    return BaseController.jsonResponse({ res: this.res, statusCode: 401, message: message ? message : 'Unauthorized', req: this.req })
  }

  public forbidden (message?: string) {
    return BaseController.jsonResponse({ res: this.res, statusCode: 403, message: message ? message : 'Forbidden', req: this.req })
  }

  public notFound (message?: string) {
    return BaseController.jsonResponse({ res: this.res, statusCode: 404, message: message ? message : 'Not found', req: this.req })
  }

  public conflict (message?: string) {
    return BaseController.jsonResponse({ res: this.res, statusCode: 409, message: message ? message : 'Conflict', req: this.req })
  }

  public tooMany (message?: string) {
    return BaseController.jsonResponse({ res: this.res, statusCode: 429, message: message ? message : 'Too many requests', req: this.req })
  }

  public fail (error: Error | string) {
    return BaseController.jsonResponse({ statusCode: 500, res: {
      message: error
    }})
  }
}
