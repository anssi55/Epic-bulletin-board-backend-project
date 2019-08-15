import { mock, instance, when, verify, reset } from 'ts-mockito';
import UserService from '../../app/services/UserService';
import User from '../../app/orm/entities/User';
import { Repository } from 'typeorm';
import { Dependencies } from '../../app/Types';
import Boom from 'boom';

describe('UserModel unit tests', () => {
  const userRepoMock = <Repository<User>>mock(Repository);
  const userRepoMockInstance = instance(userRepoMock);
  const userService = new UserService(<Dependencies>{
    userRepo: userRepoMockInstance
  });
  const user = new User();
  user.id = 1;
  user.avatar = '/home/pics/duck.jpg';
  user.email = 'a.b@abmail.com';
  user.username = 'pera';
  const users = [user];
  const emptyUsers: User[] = [];

  beforeEach(async () => {
    reset(userRepoMock);
  });

  test('Get all users', async () => {
    expect.assertions(1);
    when(userRepoMock.find()).thenResolve(users);
    await expect(userService.getAllUsers()).resolves.toEqual(users);
    verify(userRepoMock.find()).called();
  });

  test('Get all users, error test', async () => {
    expect.assertions(1);
    when(userRepoMock.find()).thenResolve(emptyUsers);
    await expect(userService.getAllUsers()).rejects.toEqual(Boom.notFound('Users not found'));
    verify(userRepoMock.find()).called();
  });

  test('Get one user', async () => {
    expect.assertions(1);
    when(userRepoMock.findOne(user.id)).thenResolve(user);
    await expect(userService.getOneUser(user.id)).resolves.toEqual(user);
    verify(userRepoMock.findOne(user.id)).called();
  });

  test('Get one user, error test', async () => {
    expect.assertions(1);
    when(userRepoMock.findOne(user.id)).thenResolve(undefined);
    await expect(userService.getOneUser(user.id)).rejects.toEqual(Boom.notFound('User not found'));
    verify(userRepoMock.findOne(user.id)).called();
  });

  test('Create user', async () => {
    expect.assertions(1);
    when(userRepoMock.save(user)).thenResolve(user);
    await expect(userService.createUser(user)).resolves.toEqual(user);
    verify(userRepoMock.save(user)).called();
  });

  test('Delete user', async () => {
    expect.assertions(1);
    when(userRepoMock.findOne(user.id)).thenResolve(user);
    when(userRepoMock.remove(user)).thenResolve(user);
    await expect(userService.deleteUser(user.id)).resolves.toEqual(user);
    verify(userRepoMock.findOne(user.id)).called();
    verify(userRepoMock.remove(user)).called();
  });

  test('Delete user, error test', async () => {
    expect.assertions(1);
    when(userRepoMock.findOne(user.id)).thenResolve(undefined);
    when(userRepoMock.remove(user)).thenResolve(user);
    await expect(userService.deleteUser(user.id)).rejects.toEqual(Boom.notFound('User not found'));
    verify(userRepoMock.findOne(user.id)).called();
    verify(userRepoMock.remove(user)).never();
  });

  test('Modify user', async () => {
    expect.assertions(1);
    when(userRepoMock.findOne(user.id)).thenResolve(user);
    when(userRepoMock.save(user)).thenResolve(user);
    await expect(userService.modifyUser(user)).resolves.toEqual(user);
    verify(userRepoMock.findOne(user.id)).called();
    verify(userRepoMock.save(user)).called();
  });

  test('Modify user, error test', async () => {
    expect.assertions(1);
    when(userRepoMock.findOne(user.id)).thenResolve(undefined);
    when(userRepoMock.save(user)).thenResolve(user);
    await expect(userService.modifyUser(user)).rejects.toEqual(Boom.notFound('User not found'));
    verify(userRepoMock.findOne(user.id)).called();
    verify(userRepoMock.save(user)).never();
  });
});
