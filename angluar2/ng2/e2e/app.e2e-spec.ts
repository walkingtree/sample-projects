import { AngularMigrationPage } from './app.po';

describe('angular-migration App', () => {
  let page: AngularMigrationPage;

  beforeEach(() => {
    page = new AngularMigrationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
