/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type LoginPage = typeof import('./e2e/pages/LoginPage');
type CustomHelper = import('./e2e/CustomHelper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, LoginPage: LoginPage }
  interface Methods extends PlaywrightTs, CustomHelper, RESTTs, JSONResponseTs {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
