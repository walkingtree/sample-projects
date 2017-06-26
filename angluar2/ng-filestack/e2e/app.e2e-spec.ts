import { FileStackAppPage } from './app.po';

describe('file-stack-app App', () => {
  let page: FileStackAppPage;

  beforeEach(() => {
    page = new FileStackAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
