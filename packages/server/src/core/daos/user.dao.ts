import { User } from "@entities/User";
import { getRepository } from "typeorm";

class UserDao {
  private static instance: UserDao;
  static getInstance(): UserDao {
    if (!UserDao.instance) {
      UserDao.instance = new UserDao();
    }
    return UserDao.instance;
  }

  async getUserByMail(email: string) {
    return await getRepository(User).findOne({
      where: {
        email
      }
    });
  }

  async create(user: User) {
    return await getRepository(User).create(user).save();
  }
}

export default UserDao.getInstance();
