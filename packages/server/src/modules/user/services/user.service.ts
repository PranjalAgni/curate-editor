import { CRUD } from "@common/interfaces/crud.interface";
import { User } from "@entities/User";
import userDao from "@user/daos/user.dao";
import { CreateUserDto, ReadUserDto, SignInUserDto } from "@user/dtos/user.dto";
import InvalidCredentials from "@user/exceptions/InvalidCredentials";
import UserNotFound from "@user/exceptions/UserNotFound";
import { hashPassword, verifyPassword } from "@utils/password";
import debug from "debug";

const debugLog: debug.IDebugger = debug("server:user-service");

class UserService implements CRUD {
  private static instance: UserService;

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async create(userData: CreateUserDto): Promise<User> {
    const user = userData as User;
    user.password = await hashPassword(user.password);
    return await userDao.create(user);
  }

  async getAllUsers(userData: ReadUserDto) {
    let usersList: Array<User> | null = null;
    if (userData.sortBy === "popular") {
      usersList = await userDao.getUsersOrderedByPopularity(
        userData.page,
        userData.limit
      );
    } else {
      usersList = await userDao.getUsersOrderedByRecentProject(
        userData.page,
        userData.limit
      );
    }

    return usersList;
  }

  async findUserById(userId: number) {
    return await userDao.findOne(userId);
  }

  async getUserByEmail(emailId: string) {
    return await userDao.getUserByEmail(emailId);
  }

  async signinUser(userData: SignInUserDto): Promise<User> {
    const user = await userDao.getUserWithPassword(userData.email);
    debugLog(user);
    if (!user) {
      throw new UserNotFound("User not Found", userData);
    }

    const isCredentialsCorrect = await verifyPassword(
      user.password,
      userData.password
    );

    if (!isCredentialsCorrect) {
      throw new InvalidCredentials("Wrong password provided");
    }

    return user;
  }

  list: (limit: number, page: number) => Promise<unknown>;
  updateById: (resourceId: number) => Promise<unknown>;
  readById: (resourceId: number) => Promise<unknown>;
  deleteById: (resourceId: number) => Promise<unknown>;
  patchById: (resourceId: number) => Promise<unknown>;
}

export default UserService.getInstance();
