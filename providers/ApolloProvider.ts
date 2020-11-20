// @ts-ignore
import { ServiceProvider } from '@adonisjs/fold';
import {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
  ApolloError,
  toApolloError,
} from 'apollo-server-core';

import ApolloServer from '../src/ApolloServer';
import { ApolloConfig } from '../src/types';

class ApolloProvider extends ServiceProvider {
  private app: any;
  public register(): void {
    this.app.singleton('Apollo/Server', () => {
      const config = this.app.use('Adonis/Src/Config');
      const Env = this.app.use('Env');
      let apolloConfig = config.get('apollo', {}) as ApolloConfig;
      const appUrl = Env.get('APP_URL');
      if (!apolloConfig.appUrl && appUrl) {
        apolloConfig = {
          ...apolloConfig,
          appUrl,
        };
      }
      return new ApolloServer(apolloConfig);
    });

    this.app.singleton('Apollo/Errors', () => ({
      AuthenticationError,
      ForbiddenError,
      UserInputError,
      ApolloError,
      toApolloError,
    }));
  }
}

export = ApolloProvider;
