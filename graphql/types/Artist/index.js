export default `
  type Artist {
    name: String,
    born: Date,
    died: Date,
    movement: Movement,
    nationality: String,
    reference: [String],
    createdAt: String,
    picture: String,
    description: String
  }

  type Date {
    date: String,
    location: String,
  }

  input DateInput {
    date: String,
    location: String,
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

  input CreateArtistInput {
    name: String!,
    born: DateInput,
    died: DateInput,
    movement: ID!,
    nationality: String,
    reference: [String],
    createdAt: String,
    picture: String!,
    description: String
  }

  input UpdateArtistInput {
    name: String!,
    born: DateInput,
    died: DateInput,
    movement: ID!,
    nationality: String,
    reference: [String],
    createdAt: String,
    picture: String,
    description: String
  } 
`;
