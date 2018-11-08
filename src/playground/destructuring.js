const book = {
  title : 'Ego is the enemy',
  author: 'Ryan Holiday',
  publisher:{
    name: 'Penguin'
  }
};

const {name:publisherName = 'Self-published'} = book.publisher;

console.log(publisherName);

const item = ['Coffee (hot)','$2.0','$2.5','$2.75'];

const [itemName,,mediumPrice = '$0.0'] =  item;

console.log(`A medium ${itemName} costs ${mediumPrice}`);