import { PrimngtempinlinePage } from './app.po';

describe('primngtempinline App', () => {
  let page: PrimngtempinlinePage;

  beforeEach(() => {
    page = new PrimngtempinlinePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
