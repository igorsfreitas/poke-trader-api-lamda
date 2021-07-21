import { Logger } from 'pino'

export default class BaseLogger {
    public log(message: string): void {
        Logger.log(message)
    }
    public error(message: string, trace?: string): void {
        Logger.error(message, trace)
    }
    public debug(message: string): void {
        Logger.debug(message)
    }
}
