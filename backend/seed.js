require('dotenv').config();
const mongoose = require('mongoose');
const Lead = require('./models/Lead');
const connectDB = require('./config/db');

const leads = [
  {
    name: 'Vignesh Kumar',
    email: 'vignesh.kumar@gmail.com',
    phone: '9876543210',
    source: 'Website',
    status: 'converted',
    notes: [
      { text: 'Reached out via contact form, very interested in the product.' },
      { text: 'Demo done, closed the deal successfully.' },
    ],
  },
  {
    name: 'Radha Krishnan',
    email: 'radha.krishnan@outlook.com',
    phone: '9123456780',
    source: 'Referral',
    status: 'contacted',
    notes: [
      { text: 'Referred by Vignesh, scheduled a call for next week.' },
    ],
  },
  {
    name: 'Geetha Lakshmi',
    email: 'geetha.lakshmi@yahoo.com',
    phone: '9988776655',
    source: 'Social Media',
    status: 'new',
    notes: [],
  },
  {
    name: 'Poornima Devi',
    email: 'poornima.devi@gmail.com',
    phone: '9345678901',
    source: 'Email Campaign',
    status: 'contacted',
    notes: [
      { text: 'Responded to the email campaign, wants a pricing breakdown.' },
    ],
  },
  {
    name: 'Rajesh Babu',
    email: 'rajesh.babu@gmail.com',
    phone: '9654321087',
    source: 'Website',
    status: 'new',
    notes: [],
  },
];

(async () => {
  await connectDB();
  await Lead.deleteMany({});
  await Lead.insertMany(leads);
  console.log('Seed data inserted!');
  mongoose.disconnect();
})();
