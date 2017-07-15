import { NewNervesAng4Page } from './app.po';

describe('new-nerves-ang4 App', () => {
  let page: NewNervesAng4Page;

  beforeEach(() => {
    page = new NewNervesAng4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
