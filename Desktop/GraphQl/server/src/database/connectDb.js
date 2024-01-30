import { connect } from "mongoose";
import { config } from "../config.js";

const connectionString = config.mongodb_connection_url
// const connectionString = config.mongodb_docker_connection_url -> if using docker

const startDbConnection = () => {
    connect(connectionString).then(() => {
        console.log("Database connection is successfull.")
    }).catch(err => console.log("Something went wrong while connecting to database..", err))
}

export default startDbConnection
