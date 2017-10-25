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
},{
  firstName: 'Sarah',
  lastName: 'Alpay',
  username: 'Sarahal',
  email: 'sarah.alpay@ga.co',
  password: 'password',
  passwordConfirmation: 'password'

},{
  firstName: 'Julie',
  lastName: 'Bernal',
  username: 'juliebe',
  email: 'julie.bernal@ga.co',
  password: 'password',
  passwordConfirmation: 'password'

  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Tea
      .create([{
        teatype: 'Sencha',
        region: 'Kyoto,uji',
        description: 'I am looking for a Sencha tea from the Kyoto region as they have a high reputation for their quality. I am quiet new to this tea things so please provide me recommendations that are easy of access and not too expensive.',
        teaquality: 'organic, full-Leaf',
        mood: 'Relaxed',
        image: 'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
        createdBy: users[0]
      },{
        teatype: 'Masala chai tea',
        region: 'Nepal,Illam district',
        description: 'I recently discovered chai tea and I was wondering if you could recommend me some good nepalese tea.I heard that the Illam tea has some unique blends, do you know where I could get them from?',
        teaquality: 'Premium, Lose-leaf',
        mood: 'Spicy',
        image: 'http://www.tching.com/corpus/files/9292ab68-ea91-4aa6-ab97-4e608acd1430/plucking-at-hile-3.jpg',
        createdBy: users[1]
      },{
        teatype: 'Genmaicha',
        region: 'Shizuoka, Japan',
        description: 'I like my Genmaicha and I heard that the Kumamoto Prefecture teas are very delicate Any recommendations of teas I could get from this area? Sensha is fine too.',
        teaquality: 'Organic, Lose-leaf',
        mood: 'Subtle, sweet',
        image: '../images/japan.jpeg',
        createdBy: users[2]
      },{
        teatype: 'Kukicha',
        region: 'Shizuoka, Japan',
        description: 'I heard that kukicha is known for its high content in minerals and vitamins so where can I get it?',
        teaquality: 'Organic',
        mood: 'Energize',
        image: '../images/kukicha.jpeg',
        createdBy: users[2]

      },{
        teatype: 'Lapsang souchong',
        region: 'Fujian, China',
        description: 'I usually drink black tea but I heard that this chinese tea is really good, anyone mind to point me in the right direction?',
        teaquality: 'Anything',
        mood: 'calm',
        image: '../images/china.jpeg',
        createdBy: users[0]
      },{
        teatype: 'Anything',
        region: 'anywhere',
        description: 'I am looking for a smookey tea that is good for winter. A blend would be good, maybe with cinnamon?',
        teaquality: 'Lose-leaf',
        mood: 'autumn',
        image: '../images/last.jpeg',
        createdBy: users[1]
      }]);
  })



  .then((teas) => console.log(`${teas.length} teas created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
