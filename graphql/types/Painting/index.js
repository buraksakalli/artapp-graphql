export default `
  type Painting {
    _id: String!
    name: String!
    date: String,
    artist: Artist!
    description: String
    movements: Movement!
    dimensions: Dimension,
    location: Location,
    genre: String,
    createdAt: String,
    reference: [String],
    picture: String!,
  }

  type Dimension {
    width: String
    height: String
    unit: String
  }

  input DimensionInput {
    width: String
    height: String
    unit: String
  }

  type Location {
    country: String
    city: String
    museum: String
  }

  input LocationInput {
    country: String
    city: String
    museum: String
  }

  type Query {
    painting(_id: ID!): Painting!
    paintings: [Painting!]!
  }

  type Mutation {
    createPainting(Painting: CreatePaintingInput): Painting!
    updatePainting(_id: String!, painting: UpdatePaintingInput!): Painting!
    deletePainting(_id: String!): Painting!
  }

  input CreatePaintingInput {
    name: String!
    date: String,
    artist: ID!
    description: String
    movements: ID!
    dimensions: DimensionInput,
    location: LocationInput,
    genre: String,
    reference: [String],
    picture: String!,
  }
  
  input UpdatePaintingInput {
    name: String!
    date: String,
    artist: ID!
    description: String
    movements: ID!
    dimensions: DimensionInput,
    location: LocationInput,
    genre: String,
    reference: [String],
    picture: String!,
  } 
`;
