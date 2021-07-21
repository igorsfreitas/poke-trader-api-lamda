import { Repo } from "src/infra/Repo";
import { User } from "../domain/user";

export interface IUserRepo extends Repo<User> {
   getUserById (id: string): Promise<User>
   addUser (name: string, pokemons: any[]): Promise<User>
   getUsers (): Promise<User[]>
}
