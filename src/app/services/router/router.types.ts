export interface IRoute {
    path: string;
    component: Function;
}

export interface IPropsRoute {
    rootQuery: string;
    canActivate: () => Promise<boolean>;
    redirectTo: string;
    withId?: boolean;
}
