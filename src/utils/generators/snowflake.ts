import * as FlakeId from 'flakeid'

const MILISECONDS_SINCE_1970 = (2020 - 1970) * 31536000 * 1000

export class Flake {
    public static gen(): string {
        const flake = new FlakeId({
            timeOffset: MILISECONDS_SINCE_1970
        })
        return flake.gen()
    }
}
