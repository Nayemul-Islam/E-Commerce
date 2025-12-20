import UserService from "./user.service.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.userService.getUsers();
      res.json(users);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await this.userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  createUser = async (req, res) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  loginUser = async (req, res) => {
    try {
      const { id, token } = await this.userService.loginUser(req.body);
      res.json({ id, token });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
      const updatedUser = await this.userService.updateUser(userId, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
      await this.userService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };
}

export default UserController;
