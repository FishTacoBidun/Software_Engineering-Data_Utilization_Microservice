//File: model.mjs containing the models for the individual databases and database operations for our database_microservice REST API
//Programmer Name: Kelsey Shanks, Wolfie Essink

import mongoose from 'mongoose';
import 'dotenv/config';

const CALORIES_DB_NAME = 'calories_db';
const SIDE_SCROLLER_DB_NAME = 'side_scroller_db';
const HIKES_DB_NAME = 'hikes_db';
const HABITS_DB_NAME = 'habits_db';

let connection1 = undefined;
let connection2 = undefined;
let connection3 = undefined;
let connection4 = undefined;

//ADD conditional to check which custom HTTP header was sent from the calling program to select DB
//This function connects to the MongoDB server and to the database
//'exercise_db' in that server.

async function connectToDatabases() {
    try{
        connection1 = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: CALORIES_DB_NAME});
        console.log("Successfully connected to MongoDB - Calories using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Calories ${err.message}`)
    }
    try{
        connection2 = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: SIDE_SCROLLER_DB_NAME});
        console.log("Successfully connected to MongoDB - Side Scroller using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Side Scroller ${err.message}`)
    }
    try{
        connection3 = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: HIKES_DB_NAME});
        console.log("Successfully connected to MongoDB - Hikes using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Hikes ${err.message}`)
    }
    try{
        connection4 = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: HABITS_DB_NAME});
        console.log("Successfully connected to MongoDB - Habits using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Habits ${err.message}`)
    }
}

//SCHEMA
//Side-Scroller Web App
const sideScrollerSchema = mongoose.Schema({
    levelId: {type: Number, required: true, unique: true},
    unlocked: {type: Boolean, required: true, default: false}
})

//Compile model from schema after defining
const Calorie_Entry = mongoose.model(CALORIES_DB_NAME, calorieCounterSchema);
const Side_Scroller_Data = mongoose.model(SIDE_SCROLLER_DB_NAME, sideScrollerSchema);
const Hikes_Data = mongoose.model(HIKES_DB_NAME, myHikesSchema);
const Habits_Data = mongoose.model(HABITS_DB_NAME, habitTrackerSchema);

//CREATE
/**
* Creates new Side_Scroller_Data object in database
* @param {number} levelId
* @param {boolean} unlocked
* @returns {object} side_scroller_data
*/
const create_side_scroller_data = async(levelId, unlocked) => { 
    const side_scroller_data = new Side_Scroller_Data({levelId: levelId, unlocked: unlocked});
    return side_scroller_data.save();
}

// GET
/**
* Pulls all Side_Scroller_Data objects in database as array
* @returns {array}
*/
const getSideScrollerData = async() => {
    const query = Side_Scroller_Data.find();
    return query.exec();
}

/**
* Pulls Side_Scroller_Data object with matching levelId
* @param {number} levelId
* @returns {object}
*/
const getSideScrollerDataByLevelId = async(levelId) => {
    const query = Side_Scroller_Data.findOne({levelId: levelId});
    return query.exec();
}

/**
* Pulls Side_Scroller_Data object with matching ID from database
* @param {string} id
* @returns {object}
*/
const getSideScrollerDataById = async(id) => {
    const query = Side_Scroller_Data.findById(id);
    return query.exec();
}

//UPDATE
/**
* Updates Side_Scroller_Data object in database with new data
* @param {string} id
* @param {object} update
* @returns {object} updatedSideScrollerData
*/
const updateSideScrollerData = async(id, update) => {
    await Side_Scroller_Data.updateOne({_id: id}, update).exec();
    const updatedSideScrollerData = getSideScrollerDataById(id);
    return updatedSideScrollerData;
}

//DELETE FOR EACH SCHEMA
/**
* Deletes Side_Scroller_Data object from database
* @param {string} id
*/
const deleteSideScrollerDataById = async(id) => {
    await Side_Scroller_Data.deleteOne({_id: id});
    return
}


//Export all functions
export { connectToDatabases, create_side_scroller_data, getSideScrollerData, getSideScrollerDataById, 
        getSideScrollerDataByLevelId, updateSideScrollerData, deleteSideScrollerDataById, 
};
