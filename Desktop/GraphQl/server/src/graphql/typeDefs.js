export const typeDefs = `#graphql
type User {
    id: String!
    username: String!
    email: String!
}

type Authpayload {
    id: String
    token: String!
}

type Query {
    me(id: ID!): User
}

type Mutation {
    registerUser(registerInput: RegisterInput!): User
    loginUser(loginUserInput: LoginInput!): Authpayload
}

input RegisterInput {
    username: String!
    email: String!
    password: String!
}

input LoginInput {
    email: String!
    password: String!
}
`