export default `
  type Movement {
    _id: ID!
    name: String
    description: String
    artists: [Artist!]!
    paintings: [Painting!]!
    createdAt: String
  }

  type Query {
    movement(_id: ID!): Movement!
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
    description: String
  }
  
  input UpdateMovementInput {
    name: String
    description: String
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;
