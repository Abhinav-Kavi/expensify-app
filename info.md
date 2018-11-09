We can use any js expression or jsx expression inside {} in a jsx expression

1. jsx expression used inside {} will have same effect as that of an direct jsx expression
2. {undefined} ,  {true/false} , {null} used inside jsx are not rendered and does not give any error
3. when nothing is returned from a js function 'undefined' is returned automatically
4. (true && 'hello')  returns 'hello'
   (false && 'hello') => false

5. Attributes -- some attributes has been renamed in JSX and those available have their casing changed to camelCase
   eg class  ---->  className
      onclick ----> onClick

6. Inside {} we can also use arrays - normal arrays or arrays of JSX
7. when using arrays of JSX assign a unique key attribute to each element of the array