
// var Datastore = require('nedb'),
import Datastore from 'nedb'
let dbUser = new Datastore({ filename: './adduser.db', autoload: true });

// console.log(db)
export default dbUser;