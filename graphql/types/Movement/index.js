export default `
  type Movement {
    _id: ID!
    name: String
    description: String
    artists: [Artist!]!
    paintings: [Painting!]!
    createdAt: String,
    picture: String
  }

  type Query {
    movement(_id: ID, name: String ): Movement!
    movements: [Movement!]!
  }

  type Mutation {
    createMovement(movement: CreateMovementInput!): Movement!
    updateMovement(_id: ID!, movements: UpdateMovementInput): Movement!
    deleteMovement(_id: ID!): Movement!
  }

  type MovementSubscriptionPayload {
    mutation: MutationType!
    movement: Movement!
  }

  input CreateMovementInput {
    name: String
    description: String,
    picture: String
  }
  
  input UpdateMovementInput {
    name: String
    description: String,
    picture: String
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;
