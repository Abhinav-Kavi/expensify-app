import numeral from 'numeral';

const numeralConfig = (() => {
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
})();