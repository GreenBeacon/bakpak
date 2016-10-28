var pg = require('pg')
var Sequelize = require('sequelize');
var db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/bakpakattak', {
  dialect: 'postgres'
});

//Establishes the connection to the database
db
  .authenticate()
  .then(function (err) {
    console.log('Connection established');
  })
  .catch(function (err) {
    console.log('Unable to connect: ', err);
  });


//Creates table of users
var User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.TEXT,
    unique: true
  },
  password: Sequelize.TEXT,
});

//creates table of trips
var Trip = db.define('trip', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  //id of the user who made the trip
  owner_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  title: Sequelize.TEXT
});

var Destination = db.define('destination', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT
});

var Flight = db.define('flight', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  origin: Sequelize.TEXT,
  flightNo: Sequelize.INTEGER,
  departure: Sequelize.DATE,
  arrival: Sequelize.DATE,
  // trip_id: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Trip,
  //     key: 'id',
  //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
  //   }
  // },
  destination_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Destination,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

var Hotel = db.define('hotel', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT,
  // trip_id: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Trip,
  //     key: 'id',
  //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
  //   }
  // },
  destination_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Destination,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

var Place = db.define('place', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT,
  // trip_id: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Trip,
  //     key: 'id',
  //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
  //   }
  // },
  destination_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Destination,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

var Restaurant = db.define('restaurant', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT,
  // trip_id: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Trip,
  //     key: 'id',
  //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
  //   }
  // },
  destination_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Destination,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

var Event = db.define('event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT,
  // trip_id: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Trip,
  //     key: 'id',
  //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
  //   }
  // },
  destination_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Destination,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

var DestinationTrip = db.define('destinations_trip', {
  // trip_id: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Trip,
  //     key: 'id',
  //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
  //   }
  // },
  // destination_id: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Destination,
  //     key: 'id',
  //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
  //   }
  // }
});

var UserTrip = db.define('users_trip', {
  trip_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Trip,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

//Defines relationships between tables
// Trip.hasOne(User, { as: owner_id });
//
// DestinationTrip.hasMany(Destination);
//Destination.hasMany(DestinationTrip, { foreignKey: 'destination_id'});
//
// DestinationTrip.hasMany(Trip);
//Trip.hasMany(DestinationTrip, { foreignKey: 'trip_id' });
Trip.hasMany(Destination, { foreignKey: 'trip_id'});
//
// UserTrip.hasMany(User);
// User.hasMany(UserTrip);
//
// UserTrip.hasMany(Trip);
// Trip.hasMany(UserTrip);
//
//Flight.hasOne(Trip);
Trip.hasMany(Flight, { foreignKey: 'trip_id' });
// Flight.hasOne(Destination);
// Destination.hasMany(Flight);
//
//Hotel.hasOne(Trip);
Trip.hasMany(Hotel, { foreignKey: 'trip_id' });
// Hotel.hasOne(Destination);
// Destination.hasMany(Hotel);
//
//Place.hasOne(Trip);
Trip.hasMany(Place, { foreignKey: 'trip_id' });
// Place.hasOne(Destination);
// Destination.hasMany(Place);
//
//Event.hasOne(Trip);
Trip.hasMany(Event, { foreignKey: 'trip_id' });
// Place.hasOne(Destination);
// Destination.hasMany(Place);
//
//Restaurant.hasOne(Trip);
Trip.hasMany(Restaurant, { foreignKey: 'trip_id' });
// Restaurant.hasOne(Destination);
// Destination.hasMany(Restaurant);


//Create Tables
db
  .sync({force: false})
  .then(function() {
    console.log('Tables created');
 });

module.exports = {
  User: User,
  Trip: Trip,
  Destination: Destination,
  Flight: Flight,
  Hotel: Hotel,
  Place: Place,
  Event: Event,
  Restaurant: Restaurant,
  DestinationTrip: DestinationTrip,
  UserTrip: UserTrip
};
