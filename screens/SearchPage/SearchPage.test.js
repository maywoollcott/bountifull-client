import React from "react";
import * as renderer from "react-test-renderer";
import store from "../../store";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";

// import App from "./App";
import SearchPage from "./SearchPage";

describe("<SearchPage />", () => {
  it("has 1 child", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PaperProvider>
            <SearchPage />
          </PaperProvider>
        </Provider>
      )
      .toJSON();
    expect(tree.children.length).toBe(1);
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PaperProvider>
            <SearchPage />
          </PaperProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toBeTruthy();
  });
});
