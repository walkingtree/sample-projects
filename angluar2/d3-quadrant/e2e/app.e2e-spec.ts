import { D3quadrantPage } from './app.po';

describe('d3quadrant App', () => {
  let page: D3quadrantPage;

  beforeEach(() => {
    page = new D3quadrantPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
