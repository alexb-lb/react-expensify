import { login, logout } from '../../actions/auth';

// LOGIN
test('should generate login action object', () => {
  const uid = 'KFn23fvls';
  const action = login(uid);
  expect(action).toEqual({type: 'LOGIN', uid})
});

// LOGOUT
test('should generate logout action object', () => {
  const action = logout();
  expect(action).toEqual({type: 'LOGOUT'})
});