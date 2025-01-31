/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const dinosaurs = require("../data/dinosaurs");
const exampleDinosaurData = require("../data/dinosaurs");
const rooms = require("../data/rooms");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  //use a new variable to pull out the dinosaur object from the array if it is exists
  let dinoExists;
  
  for(let i = 0; i < dinosaurs.length; i++){
    if(dinosaurs[i].name === dinosaurName){
      dinoExists = dinosaurs[i];
      break;
    } 
  }
  
  if(!dinoExists){
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }

  let foundDinoRoom;

  for(let i = 0; i < rooms.length; i++){
    //check the dinosaur array within rooms array for existing 'dinosaurId'
    if(rooms[i].dinosaurs.includes(dinoExists.dinosaurId)){
      foundDinoRoom = rooms[i].name;
      break;
    }
  }

  if(!foundDinoRoom){
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  }

  return foundDinoRoom;
}

//1. set a variable to hold our return
//1.5. loop through the dinosaur array to find the dinosaurID that matches our dinosaurName parameter; save this in a variable
  //if there is no match return an error message
//2. loop through the rooms array and check eac .dinosaur for our dinosaur for our dinosaurID variable
//3. return room name if we have a match

// let dinoId;
// let result;

// for(let i = 0; i < dinosaurs.length; i++){
//   if(dinosaurs[i].name === dinosaurName){
//     dinoId = dinosaurs[i].dinosaurId;
//     break;
//   }
// }

// if(!dinoId){
//   return `Dinosaur with name '${dinosaurName}' cannot be found.`;
// }

// for(let room of rooms){
//   if(room.dinosaurs.includes(dinoId)){
//     result = room.name;
//     return result;
//   }
// }

// if(!result){
//   return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
// }


/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "aIA6tevTne");
 *  //> ["Ticket Center"]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "A6QaYdyKra");
 *  //> [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing"
    ]
 */
function getConnectedRoomNamesById(rooms, id) {
  let foundRoom;
  //check rooms array for matching 'id', pulls matching room object out and saves it to a variable
  for(let i = 0; i < rooms.length; i++){
    if(rooms[i].roomId === id){
      foundRoom = rooms[i];
      break;
    }
  }

  //if 'foundRoom' variable is undefined return error
  if(!foundRoom){
    return `Room with ID of '${id}' could not be found.`
  }

  let connectedRooms = [];
  //create a variable to hold the connected room id not found within rooms array
  let incorrectId;

  for(let i = 0; i < rooms.length; i++){
    for(let j = 0; j < foundRoom.connectsTo.length; j++){
      if(foundRoom.connectsTo[j] === rooms[i].roomId){
        connectedRooms.push(rooms[i].name)
      } else{
        incorrectId = foundRoom.connectsTo[j]
      }
    }
  }

  //checks if the length of the new array matches the length of the 'connectsTo' array; if they do not match that means one of the id's within the 'connectsTo' array of the foundRoom is incorrect
  if(connectedRooms.length !== foundRoom.connectsTo.length){
    return `Room with ID of '${incorrectId}' could not be found.`
  }

  return connectedRooms;
}

//1. set our variable
//2. loop through rooms - find matching room by ID
//3. save rooms connectsTo in a variable
//4. loop through connectsTo varibale
//5. for each item in the connects to variable - we need to get its name
  //loop through the rooms array and match the roomId to the item in connectsTo - then pursh that items name into the return variable
  // let result = [];
  // let connectsTo;
  // for(let i = 0; i < rooms.length; i++){
  //   if(rooms[i].roomId === id){
  //     connectsTo = Array.from(rooms[i].connectsTo);
  //     break;
  //   }
  //   if( i === rooms.length - 1){
  //     return `Room with ID of '${id}' could not be found.`
  //   }
  // }
  // //outer loop - looping over our connectsTo array
  // for(let i = 0; i < connectsTo.length; i++){
  // //inner loop - loop over the rooms array to find match
  //   for(let j = 0; j < rooms.length; j++){
  //     if(rooms[j].roomId === connectsTo[i]){
  //       result.push(rooms[j].name);
  //       break;
  //     }
  //     if(j === rooms.length - 1){
  //       return `Room with ID of '${connectsTo[i]} could not be found.`
  //     }
  //   }
  //   return result;
  // }

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
