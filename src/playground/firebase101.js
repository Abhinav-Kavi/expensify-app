import * as firebase from 'firebase';


var config = {
  apiKey: "AIzaSyCVeiQsA1nkejCD7jhaID9ymZcNwEHT-7g",
  authDomain: "expensify-fe6aa.firebaseapp.com",
  databaseURL: "https://expensify-fe6aa.firebaseio.com",
  projectId: "expensify-fe6aa",
  storageBucket: "expensify-fe6aa.appspot.com",
  messagingSenderId: "1081050066196"
};

firebase.initializeApp(config);

const database = firebase.database();

const expenses = [{
  description : 'breakfast',
  amount : 60,
  note : '@ office',
  createdAt: 124
},
{
  description : 'lunch',
  amount : 200,
  note : '@ Bawarchi',
  createdAt: 1324
},
{
  description : 'dinner',
  amount : 190,
  note : '@ deepak punjabi dhaba',
  createdAt: 12454
}];


/*----child_removed ----*/
const childRemovedSub = database.ref('expenses').on('child_removed',snapshot => {
  console.log(snapshot.key,snapshot.val());
},
e => console.log("Error : \n", e));


/*----child_changed ----*/
const childChangedSub = database.ref('expenses').on('child_changed',snapshot => {
  console.log(snapshot.key,snapshot.val());
},
e => console.log("Error : \n", e));

/*----child_added ----(also runs initially once for each existing data)*/
const childAddedSub = database.ref('expenses').on('child_added',snapshot => {
  console.log(snapshot.key,snapshot.val());
},
e => console.log("Error : \n", e));

setTimeout(()=>{
  database.ref('expenses').push(expenses[1]);
}, 10000);


/*----key and forEach----*/
database.ref('expenses').once('value')
  .then(snapshot =>{
    const expenseList = [];
    snapshot.forEach(childSnapshot =>{
      expenseList.push({
        id : childSnapshot.key,
        ...childSnapshot.val()
      });
    });

    console.log(expenseList);
  })
  .catch(e => console.log("Error : \n", e));


const expensesSub = database.ref('expenses').on('value', snapshot =>{
  const expenseList = [];
  
  snapshot.forEach(childSnapshot =>{
    expenseList.push({
      id : childSnapshot.key,
      ...childSnapshot.val()
    });
  });

  console.log(expenseList);
},
e => console.log("Error : \n", e)
);


/*---push------------*/

database.ref().set(expenses);

database.ref('expenses').push(expenses[0]);
database.ref('expenses').push(expenses[1]);
database.ref('expenses').push(expenses[2]);


/*----read----*/
database.ref().once('value')
 .then(snapshot => console.log(snapshot.val()))
 .catch(e => console.log('Error','\n',e));

const onValueChange = database.ref().on('value',(snapshot)=>{
  console.log(snapshot.val());
}, (e)=>console.log("Error with data fetching\n", e));

setTimeout(()=>{
  database.ref('age').set(25);
},3000);

setTimeout(()=>{
  database.ref().off('value',onValueChange);
},6000);

setTimeout(()=>{
  database.ref('age').set(26);
},6000);

const dataSub = database.ref().on('value',
  (snapshot)=> {
    const data = snapshot.val();
    console.log(`${data.name} is a ${data.job.title} at ${data.job.company}`);
  },
  (e)=>console.log("Error with data fetching\n", e)
);

/*---set-----*/

database.ref().set({
  name : 'Abhinav Kavi',
  age : 23,
  stressLevel : 6,
  job : {
    title : 'Software Engineer',
    company : 'Wipro'
  },
  isSingle : true,
  location : {
    city : 'Pune',
    country : 'India'
  }
 })
  .then(()=>console.log("Data was successfully written!"))
  .catch((e)=>console.log("Something went wrong.\nError",e));

/*---remove-----*/
database.ref('isSingle').remove()
  .then(()=>console.log("Data was removed successfully!"))
  .catch((e)=>console.log("Something went wrong.\nError",e));

database.ref('isSingle').set(null)
  .then(()=>console.log("Data was removed successfully!"))
  .catch((e)=>console.log("Something went wrong.\nError",e));


/*---update-----*/
database.ref().update({
  stressLevel  : 9,
  'job/company' : 'Deloitte',
  'location/city' : 'Hyderabad'
})
  .then(()=>console.log("Data was updated successfully!"))
  .catch((e)=>console.log("Something went wrong.\nError",e));
