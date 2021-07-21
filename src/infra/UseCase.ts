export interface UseCase<IRequest, IResponse> {
    execute (request?: IRequest, ctx?:any) : Promise<IResponse> | IResponse
}