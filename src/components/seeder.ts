import UserService from './User/service';
import EventTypeService from './EventType/service';
import { Permission } from './User/model';
import UserModel from './User/model';
import EventTypeModel from './EventType/model';
import Logger from '@/utils/Logger';

const usersData = [
  {
    email: 'admin-fullerton@yopmail.com',
    password: 'fullerton',
    permission: Permission.ADMIN,
  },
  {
    email: 'fullerton1@yopmail.com',
    password: 'fullerton',
    permission: Permission.USER,
  },
  {
    email: 'fullerton2@yopmail.com',
    password: 'fullerton',
    permission: Permission.USER,
  },
];

const eventTypesData = [
  { type: 'Health Talk' },
  { type: 'Wellness Events' },
  { type: 'Fitness Activities' },
]

export default async () => {
  // Seeding users
  for (let user of usersData) {
    const users = await UserService.find({ email: user.email });
    if (users.length === 0) {
      await UserModel.create(user);
    }
  }

  // Seeding event types
  for (let eventType of eventTypesData) {
    const types = await EventTypeService.find({ type: eventType.type });
    if (types.length === 0) {
      await EventTypeModel.create({
        ...eventType,
        protected: true,
      });
    }
  }

  Logger.info('[Seeding] data has been seeded');
};
