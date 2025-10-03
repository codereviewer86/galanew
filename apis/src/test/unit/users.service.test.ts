import { UserModel } from "../../models/users.model";
import usersService from "../../services/users.service";

test('the data is peanut butter', async () => {
    const data = (usersService.findAllUser());
    expect(data).toBe(UserModel);
  });