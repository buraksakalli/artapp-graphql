import { mergeResolvers } from "merge-graphql-schemas";

import Artist from "./Artist/";
import Movement from "./Movement/";
import Painting from "./Painting/";

const resolvers = [Artist, Movement, Painting];

export default mergeResolvers(resolvers);
