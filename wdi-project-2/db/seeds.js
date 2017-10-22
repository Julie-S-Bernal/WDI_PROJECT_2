const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

const Tea = require('../models/tea');
const User = require('../models/user');

Tea.collection.drop();
User.collection.drop();

User
.create([{
    firstName: 'Mike',
    lastName: 'Hayden',
    username: 'mickyginger',
    email: 'mike.hayden@ga.co',
    password: 'password',
    passwordConfirmation: 'password'
}])
.then((users) => {
  console.log(`${users.length} users created`);
  return Hotel
    .create([{
      name: 'Hotel ibis London City',
      address: {
        line1: '5 Commercial Street',
        city: 'London',
        postcode: 'E1 6BF',
        country: 'UK'
      },
      image: 'https://www.ahstatic.com/photos/5011_ho_00_p_346x260.jpg',
      stars: 3,
      createdBy: users[0]
    },{
      name: 'Premier Inn London City',
      address: {
        line1: '66 Alie Street',
        city: 'London',
        postcode: 'E1 8PX',
        country: 'UK'
      },
      image: 'http://www.premierinn.com/content/dam/pi/websites/hotelimages/gb/en/L/LONALD/358x620xLondon,P20Aldgate,P2001.jpg.piimage.thumbnail.620.358.jpg.pagespeed.ic.ggMHI3f4MV.jpg',
      stars: 3,
      createdBy: users[0]
    }]);
  })
  .then((teas) => console.log(`${teas.length} teas created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
