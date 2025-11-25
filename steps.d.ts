/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type loginPage = typeof import('./e2e/pages/loginPage.steps');

declare namespace CodeceptJS {
  interface SupportObject { I: I, LoginPage: loginPage }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
