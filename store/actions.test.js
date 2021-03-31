import mockStore from "redux-mock-store";
import { LOGOUT } from "../actions/logout";
import { testUser } from "jest/mock-objects";

describe("Testing the sign in authentication", () => {
  const store = mockStore();

  it("user attempts with correct password and succeeds", async () => {
    await store.dispatch(authenticateUser("example@gmail.com", "password"));
    expect(store.getActions()).toMatchSnapshot();
  });
});
describe("Testing reducers after user LOGS OUT", () => {
  it("user is returned back to initial app state", () => {
    expect(user(testUser, { type: LOGOUT })).toMatchSnapshot();
  });
});
