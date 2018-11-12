import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';


const ExpenseListItem = ({description,amount,createdAt,id})=>(
  <div>
    <Link to={`/edit/${id}`}> <h3>{description}</h3> </Link>
    <p>
     {numeralConfig()}
     {numeral(amount).format('$0,0.00')} 
     -
     {moment(createdAt).format('MMMM Do, YYYY')}</p>   
  </div>
);

const numeralConfig = () => {
  numeral.register('locale', 'In', {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '₹'
    }
  });

  // switch between locales
  numeral.locale('In');
}

export default ExpenseListItem;