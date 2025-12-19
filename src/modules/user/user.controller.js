import { userService } from "../src/modules/user/user.service.js";
class UserController {
  async getUsers(req, res) {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const user = await userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async loginUser(req, res) {
    try {
      const { id, token } = await userService.loginUser(req.body);
      res.json({ id, token });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    const userId = req.params.id;
    try {
      const updatedUser = await userService.updateUser(userId, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }
  
  async deleteUser(req, res) {
    const userId = req.params.id;
    try {
      await userService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }
}
export const userController = new UserController();
