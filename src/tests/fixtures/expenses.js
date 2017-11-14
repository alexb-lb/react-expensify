import moment from 'moment';

export default [
  {
    id: 0,
    description: 'Gym ',
    amount: 50600,
    createdAt: moment(0)
  },
  {
    id: 1,
    description: 'Rent bill',
    amount: 100500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
  },
  {
    id: 2,
    description: 'water bill',
    amount: 100,
    createdAt: moment(0).add(4, 'days').valueOf()
  }
];