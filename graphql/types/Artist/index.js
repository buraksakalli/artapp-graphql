export default `
  type Artist {
    _id: String!
    name: String!
    date: String,
    artist: ID!
    description: String
    movements: ID!
    dimensions: Dimension,
    location: Location,
    genre: String,
    createdAt: String,
    reference: [String],
    picture: String!,
  }

  type Query {
    artist(_id: ID!): Artist!
    artists: [Artist!]!
  }

  type Mutation {
    createArtist(Artist: CreateArtistInput): Artist!
    updateArtist(_id: String!, artist: UpdateArtistInput!): Artist!
    deleteArtist(_id: String!): Artist!
  }

  input Dimension {
    width: String
    height: String
    unit: String
  }

  input Location {
    country: String
    city: String
    museum: String
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int!
  }
  
  input UpdateUserInput {
    name: String
    email: String
    age: Int
  } 
`;
