import { createUser, getAllUsers } from "../../main/admin/admin-service.js";
import KcAdminClient from '@keycloak/keycloak-admin-client';
import { assert, describe, expect, it, test, vi } from 'vitest'
import User from "../../main/user/user.js";
import UserAlreadyExists from "../../main/errors/user-already-exists.js";

describe('get all users', async () => {
    const mockUsers = [
        new User("username1", "firstName1", "lastName1", "email1"),
        new User("username2", "firstName2", "lastName2", "email2"),
        new User("username3", "firstName3", "lastName3", "email3"),
    ];
    const kcAdminClient = {
        users: {
          find: vi.fn().mockResolvedValue(mockUsers)
        }
      };

      test('it should return all users', async () => {
        const result = await getAllUsers(kcAdminClient);
        expect(result).toEqual(mockUsers);
      });
});

describe('create user', async () => {
  const mockUser = new User("username1", "firstName1", "lastName1", "email1");
  const kcAdminClient = {
    users: {
      create: vi.fn().mockResolvedValue(mockUser)
    }
  };

  test('it should create a user', async () => {
    const result = await createUser(kcAdminClient, mockUser);

    expect(kcAdminClient.users.create).toHaveBeenCalledOnce();
    expect(result).toEqual(mockUser);
  });

  test('is should fails due to already existing user', async () => {
    kcAdminClient.users.create = vi.fn().mockRejectedValueOnce({
      response: {
        status: 409,
        data: {
          errorMessage: 'User already exists'
        }
      }
    });

    expect(createUser(kcAdminClient, mockUser)).rejects.toThrowError(new UserAlreadyExists('User already exists'));
  });

});