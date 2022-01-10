import Route from './route';

export default class Router {
  static __instance: Router;

  private readonly rootQuery: string;

  routes: Route[];
  history: History;
  currentRoute: null | Route;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this.rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(path: string, component: Function, canActivate?: () => Promise<boolean>, redirectTo?: string) {
    if (path.includes('/:')) {
      path = path.split('/')
        .filter((_item, index) => index !== path.split('/').length - 1)
        .join('/');

      const route = new Route(path, component, {
        canActivate, rootQuery: this.rootQuery, redirectTo, withId: true,
      });

      this.routes.push(route);
    }
    const route = new Route(path, component, { canActivate, rootQuery: this.rootQuery, redirectTo });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event) => {
      this.onRoute((event.currentTarget as Window).location.pathname);
    });

    this.onRoute(window.location.pathname);
  }

  private onRoute(path: string) {
    const route = this.getRoute(path) || this.getRoute('**');
    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  go(path: string) {
    this.history.pushState({}, '', path);
    this.onRoute(path);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  private getRoute(path: string): Route {
    return this.routes.find((route: Route) => route.match(path)) as Route;
  }
}
