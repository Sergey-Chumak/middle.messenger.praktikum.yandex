import Route from './route';

class Router {
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

  public use(path: string, component: Function, canActivate = () => Promise.resolve(true), redirectTo: string = '/') {
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

  public start() {
    window.onpopstate = ((event) => {
      this.onRoute((event.currentTarget as Window).location.pathname);
    });

    this.onRoute(window.location.pathname);
  }

  public go(path: string) {
    this.history.pushState({}, '', path);
    this.onRoute(path);
  }

  public back() {
    window.history.back();
  }

  public forward() {
    window.history.forward();
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

  private getRoute(path: string): Route {
    return this.routes.find((route: Route) => route.match(path)) as Route;
  }
}

export const router = new Router('#main');
