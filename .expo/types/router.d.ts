/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth-routes)` | `/(auth-routes)/home` | `/(auth-routes)/home/feed` | `/(auth-routes)/home/profile` | `/(auth-routes)/new-post` | `/(auth-routes)/profile` | `/_sitemap` | `/ctx` | `/home` | `/home/feed` | `/home/profile` | `/login` | `/new-post` | `/profile` | `/register`;
      DynamicRoutes: `/(auth-routes)/post/${Router.SingleRoutePart<T>}` | `/(auth-routes)/user-profile/${Router.SingleRoutePart<T>}` | `/post/${Router.SingleRoutePart<T>}` | `/user-profile/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(auth-routes)/post/[id]` | `/(auth-routes)/user-profile/[id]` | `/post/[id]` | `/user-profile/[id]`;
    }
  }
}
