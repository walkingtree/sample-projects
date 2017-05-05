import { SampleappPage } from './app.po';

describe('sampleapp App', () => {
  let page: SampleappPage;

  beforeEach(() => {
    page = new SampleappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
