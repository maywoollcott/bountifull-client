import React from "react";
import * as renderer from "react-test-renderer";
import store from "../../store";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";

import MainTabs from "./MainTabs";

describe("<MainTabs />", () => {
  it("has 1 child", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PaperProvider>
            <MainTabs />
          </PaperProvider>
        </Provider>
      )
      .toJSON();
    expect(tree.children.length).toBe(1);
  });

  it("renders correctly across all screens", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PaperProvider>
            <MainTabs />
          </PaperProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMAtchSnapshot();
  });
});
