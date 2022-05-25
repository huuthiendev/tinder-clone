import { Router } from 'express';
import { AppRoute } from './interfaces/app_route.interface';
import { UserController } from './controllers/user.controller';

export class AppRouting {
  constructor(private route: Router) {
    this.route = route;

    // Add the routing classes.
    this.addRoute(new UserController());
  }

  private addRoute(appRoute: AppRoute) {
    this.route.use(appRoute.route, appRoute.router);
  }
}