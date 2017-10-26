import { AwsAngularPage } from './app.po';

describe('aws-angular App', () => {
  let page: AwsAngularPage;

  beforeEach(() => {
    page = new AwsAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
