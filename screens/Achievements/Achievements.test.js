import React from "react";
import * as renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import store from "../../store";

import Achievements from "./Achievements";

describe("<Achievements />", () => {
  it("has 1 child", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PaperProvider>
            <Achievements />
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
            <Achievements />
          </PaperProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toBeTruthy();
  });
});
