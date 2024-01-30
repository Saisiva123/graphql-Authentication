import { connect } from "mongoose";
import { config } from "../config.js";

const connectionString = config.mongodb_connection_url

const startDbConnection = () => {
    connect(connectionString).then(() => {
        console.log("Database connection is successfull.")
    }).catch(err => console.log("Something went wrong while connecting to database.."))
}

export default startDbConnection
