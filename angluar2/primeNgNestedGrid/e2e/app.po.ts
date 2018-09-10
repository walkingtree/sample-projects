import { browser, by, element } from 'protractor';

export class PrimngtempinlinePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root p-panel p-header div span')).getText();
  }
}
