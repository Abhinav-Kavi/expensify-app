import moment from 'moment';

export default [
{
  id : 1,
  description : 'Credit Card Bill',
  note : '',
  amount : 10000,
  createdAt : moment(0).subtract(4,'days').valueOf()
},
{
  id : 2,
  description : 'Lunch',
  note : '',
  amount : 300,
  createdAt : 0
},
{
  id : 3,
  description : 'Rent',
  note : '',
  amount : 7000,
  createdAt : moment(0).add(4,'days').valueOf()
}];