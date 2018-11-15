const promiseFn = () => {

  return new Promise((res,rej) =>{
    setTimeout(() => {
      console.log('Inside promise');
      res();
    }, 3000);
  });
  
};

const secondFn = ()=>{
  return promiseFn().then(()=>{
    console.log(' promise ran successfully');
    return 'new data';
  });
}

secondFn().then((data) => console.log('second fn ran successfully', data));