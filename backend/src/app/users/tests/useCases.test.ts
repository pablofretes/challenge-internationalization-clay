import { UserUseCases } from "../application/userUseCases";
import { MockRepositoryImplementation } from "../infrastructure/repositories/mock.repository";
import { expect, describe, it } from '@jest/globals';
import { CryptoAdapter } from "../../shared/hash";
import { UserEntity } from "../domain/user.entity";

describe('User use cases', () => {
  const userRepository = new MockRepositoryImplementation()
  const userUseCases = new UserUseCases(userRepository, new CryptoAdapter)

  it('should create a user', async () => {
    const user = { username: "John Doe", password: "123456" };
    const createdUser = await userUseCases.createUser(user)

    expect(createdUser).toBeDefined();
    expect(createdUser?.uuid).toBeDefined();
    expect(createdUser?.username).toBe(user.username);
    expect(createdUser?.password).not.toBe(user.password);
  });

  it('should find a user by username', async () => {
    const username = "John Doe"
    const foundUser = await userUseCases.findUserByUsername(username)

    expect(foundUser).toBeDefined();
    expect(foundUser?.uuid).toBeDefined();
    expect(foundUser?.username).toBe(username);
    expect(foundUser).toHaveProperty("password");
  });
});