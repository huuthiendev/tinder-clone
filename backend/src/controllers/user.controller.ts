import { Router, Request, Response } from 'express';
import { AppRoute } from '../interfaces/app_route.interface';
import { Reaction, IReaction, IReactionType } from '../models/reaction.model';
import { User, IUser } from '../models/user.model';
import { checkRequireParams } from '../middleware/validator.middleware';
import { faker } from '@faker-js/faker';
import errors from '../utils/errors';
import { Types } from 'mongoose';

export class UserController implements AppRoute {
  public route = '/user';
  public router: Router = Router();
  constructor() {
    this.router.get('/', this.getUsers);
    this.router.get('/:user_id', this.getUserProfile);

    this.router.post('/action/reaction', checkRequireParams(['user_id', 'reaction_user_id', 'reaction_type']), this.reaction);
    this.router.get('/action/matches/:user_id', this.generateUsers);
    this.router.get('/action/liked/:user_id', this.getLikedList);

    this.router.get('/action/generate', this.generateUsers);
  }

  public async getUsers(req: Request, res: Response): Promise<any> {
    try {
      var page: number = req.query.page ? parseInt(req.query.page.toString()) : 0;
      var limit: number = req.query.limit ? parseInt(req.query.limit.toString()) : 0;

      var users = await User.find(req.query.user_id ? { _id: { $ne: req.query.user_id } } : {})
        .skip(page * limit)
        .limit(limit);

      var previewUsers = users.map((user: IUser) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture
      }));
      return res.json({ data: previewUsers });
    }
    catch (err) {
      console.log('[UserController] getUsers - ERROR: ', err);
      return res.status(400).send(err);
    }
  }

  public async getUserProfile(req: Request, res: Response): Promise<any> {
    try {
      if (!Types.ObjectId.isValid(req.params.user_id)) {
        return res.status(400).send(errors.USER_ID_INVALID);
      }
      var userProfile = await User.findOne({ _id: req.params.user_id });
      if (!userProfile) {
        return res.status(400).send(errors.USER_ID_INVALID);
      }
      return res.json(userProfile);
    }
    catch (err) {
      console.log('[UserController] getUserProfile - ERROR: ', err);
      return res.status(400).send(err);
    }
  }

  public async reaction(req: Request, res: Response): Promise<any> {
    try {
      if (isNaN(req.body.reaction_type)) {
        return res.status(400).send(errors.REACTION_TYPE_INVALID);
      }
      var payload: IReaction = {
        user_id: req.body.user_id,
        reaction_user_id: req.body.reaction_user_id,
        reaction_type: parseInt(req.body.reaction_type)
      };

      var reaction = await Reaction.findOneAndUpdate({
        user_id: payload.user_id,
        reaction_user_id: payload.reaction_user_id
      }, {
        reaction_type: payload.reaction_type
      });
      if (!reaction) {
        reaction = await Reaction.create(payload);
      }

      return res.json(reaction);
    }
    catch (err) {
      console.log('[UserController] reaction - ERROR: ', err);
      return res.status(400).send(err);
    }
  }

  public async generateUsers(req: Request, res: Response): Promise<any> {
    try {
      for (let index = 0; index < 100; index++) {
        let userInfo = {
          firstName: faker.name.findName(),
          lastName: faker.name.lastName(),
          picture: faker.image.avatar(),
          dateOfBirth: faker.date.between('1950-01-01T00:00:00.000Z', '2015-01-01T00:00:00.000Z'),
          email: faker.internet.email(),
          gender: faker.name.gender(),
          phone: faker.phone.phoneNumber()
        };
        await User.create(userInfo);
      }
      return res.json('okay');
    }
    catch (err) {
      console.log('[UserController] generateUsers - ERROR: ', err);
      return res.status(400).send(err);
    }
  }

  public async getMatchesList(req: Request, res: Response): Promise<any> {
    try {
      if (!Types.ObjectId.isValid(req.params.user_id)) {
        return res.status(400).send(errors.USER_ID_INVALID);
      }
      var matchesList = new Array();
      var likedList = await Reaction.find({ user_id: req.params.user_id, reaction_type: IReactionType.like });

      for (let index = 0; index < likedList.length; index++) {
        var reaction: IReaction = likedList[index];
        var checkMatch = await Reaction.findOne({ user_id: reaction.reaction_user_id, reaction_user_id: reaction.user_id, reaction_type: IReactionType.like });
        if (checkMatch) {
          matchesList.push(checkMatch);
        }
      }
      return res.json(matchesList);
    }
    catch (err) {
      console.log('[UserController] getMatchesList - ERROR: ', err);
      return res.status(400).send(err);
    }
  }

  public async getLikedList(req: Request, res: Response): Promise<any> {
    try {
      if (!Types.ObjectId.isValid(req.params.user_id)) {
        return res.status(400).send(errors.USER_ID_INVALID);
      }
      var likedList = await Reaction.find({ user_id: req.params.user_id, reaction_type: IReactionType.like });
      return res.json(likedList);
    }
    catch (err) {
      console.log('[UserController] getLikedList - ERROR: ', err);
      return res.status(400).send(err);
    }
  }
}