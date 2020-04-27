
// var Datastore = require('nedb'),
import Datastore from 'nedb'
let db = new Datastore({ filename: './message.db', autoload: true });

// console.log(db)
export default db;
