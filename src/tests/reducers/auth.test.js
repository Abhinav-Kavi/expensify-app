import authReducer from '../../reducers/auth';

test('should set uid for login',()=>{
  const state = {};
  const action = {
    type : 'LOGIN',
    uid : '134test'
  };
  const result = authReducer(state,action);
  expect(result).toEqual({uid:action.uid});
});


test('should return empty state for logout',()=>{
  const state = { uid : '134test'};
  const action = {
    type : 'LOGOUT'
  };
  const result = authReducer(state,action);
  expect(result).toEqual({});
});