import { Selector } from 'testcafe'

export class AppPage {
  private root = Selector('.container')
  heading = Selector('h1')
  search = Selector(`[data-test-id="search"]`)
  loading = Selector(`[data-test-id="loading"]`)
  profile = Selector(`[data-test-id="profile"]`)
  error = Selector(`[data-test-id="error"]`)
}
