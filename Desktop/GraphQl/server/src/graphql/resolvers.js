import { GraphQLError } from "graphql"
import User from "../database/models/user.model.js"
import { hash, compare } from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "../config.js"

const jwtSecretKey = config.jwt_secret_key

export const resolvers = {
    Mutation: {
        async registerUser(_, { registerInput: { username, email, password } }) {
            const oldUser = await User.findOne({ $or: [{ email }, { username }] })
            if (oldUser) {
                throw new GraphQLError("A user already exists with this username or email", {
                    extensions: {
                        code: 'USER_ALREADY_EXISTS'
                    }
                })
            }
            const encryptedPassword = await hash(password, 10)
            const newUser = new User({
                username, email: email.toLowerCase(), password: encryptedPassword
            })
            const res = await newUser.save()
            return {
                id: res._id,
                username: res.username,
                email: res.email
            }
        },

        async loginUser(_, args) {
            const { email, password } = args.loginUserInput
            const user = await User.findOne({ email })
            if (!user) {
                throw new GraphQLError("User not found, Please create an account", {
                    extensions: {
                        code: 'USER_NOT_FOUND'
                    }
                })
            }

            const validPwd = await compare(password, user.password)
            if (!validPwd) {
                throw new GraphQLError("Password is incorrect", {
                    extensions: {
                        code: 'USER_WRONG_PASSWORD'
                    }
                })
            }
            const token = jwt.sign({ username: user.username, email: user.email }, jwtSecretKey, { expiresIn: '2h' })
            return { id: user._id, token }
        }
    },
    Query: {
        async me(_, { id }) {
            try {
                const user = await User.findOne({ _id: id })
                if (user) {
                    const { username, _id, email } = user
                    return { username, id: _id, email }
                }
            }
            catch (err) {
                throw new GraphQLError("Something went wrong while fetching user details", {
                    extensions: {
                        code: 'SOMETHING_WENT_WRONG'
                    }
                })
            }
        }
    }
}