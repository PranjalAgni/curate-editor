import { AuthToken } from "@entities/AuthToken";
import { User } from "@entities/User";
import { getRepository } from "typeorm";

class AuthDao {
  private static instance: AuthDao;
  static getInstance(): AuthDao {
    if (!AuthDao.instance) {
      AuthDao.instance = new AuthDao();
    }
    return AuthDao.instance;
  }

  async create(user: User): Promise<string> {
    const userSession = new AuthToken();
    userSession.user = user;
    await getRepository(AuthToken).create(userSession).save();
    return userSession.sessionId;
  }
}

export default AuthDao.getInstance();
