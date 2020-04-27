
// var Datastore = require('nedb'),
// db = new Datastore({ filename: './message.db', autoload: true });

// module.exports = db;

import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'
console.log( path.join(remote.app.getPath('userData'), '/message.db'))
export default new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/message.db')
})
