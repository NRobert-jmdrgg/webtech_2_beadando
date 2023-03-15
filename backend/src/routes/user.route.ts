import { app } from '../index';
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  giveAdminRights,
  updateUser,
} from '../controllers/user.controller';

app.get('users/', getAllUsers);
app.get('users/:id/', getUserById);
app.post('users/:id/update/', updateUser);
app.delete('users/:id/delete/', deleteUser);
app.post('users/add/', addUser);
app.post('users/:id/admin/', giveAdminRights);
