export interface ResCheckPokeTradingDto {
  isValid: boolean
  reason?: string
}

export interface CheckPokeTradingDto {
  offered: string[]
  required: string[]
}

export interface ResAddUserDto {
  id?: string
  name: string
  pokemons: any[]
}

export interface AddUserDto {
  name: string
}

export interface ResAddProposalDto {
  id: string
  userOfered: {
    name: string
    userId: string
  }
  pokemonsOffered: any[]
  userAccepted?: {
    name: string
    userId: string
  }
  pokemonsAccepted?: any[]
  acceptDate?: Date
  createdAt: Date
}

export interface AddProposalDto {
  userOfered: {
    name: string
    userId: string
  }
  pokemonsOffered: any[]
}

export interface AcceptProposalDto {
  id: string
  offer: {
    user: {
      id: string
      name: string
    },
    pokemons: any[]
  }
  accept: {
    user: {
      id: string
      name: string
    },
    pokemons: any[]
  }
  
}
