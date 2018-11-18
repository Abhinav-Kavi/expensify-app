import {login,logout} from '../../actions/auth';

test('should return login action correctly',()=>{
  const uid = 'test1434';
  const expectedResult = {
    type : 'LOGIN',
    uid
  };
  const result = login(uid);

  expect(result).toEqual(expectedResult);
});


test('should return logout action correctly',()=>{
  const expectedResult = {
    type : 'LOGOUT',
  };
  const result = logout();

  expect(result).toEqual(expectedResult);
});