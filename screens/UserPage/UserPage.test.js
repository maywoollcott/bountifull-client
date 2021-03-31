import React from "react";
import * as renderer from "react-test-renderer";
import store from "../../store";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import UserPage, { UserPageStack, UpdateInfo, Achievements } from "./UserPage";
import { fireEvent, render, waitFor } from "react-native-testing-library";
import { NavigationContainer } from "@react-navigation/native";

import UserPage from "./UserPage";

describe("<UserPage />", () => {
  it("has 1 child", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PaperProvider>
            <UserPage />
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
            <UserPage />
          </PaperProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toBeTruthy();
  });

  it('navigates on update info button press', () => {
    const push = jest.fn();
    const { getByText } = render(<Provider store={store}><UserPage navigation={{ push }} /></Provider>);
    fireEvent.press(getByText('Go to UpdateInfo'));
    expect(push).toHaveBeenCalledWith('UpdateInfo');
  });

  it('navigates on achievements button press', () => {
    const push = jest.fn();
    const { getByText } = render(<Provider store={store}><UserPage navigation={{ push }} /></Provider>);
    fireEvent.press(getByText('Go to Achievements'));
    expect(push).toHaveBeenCalledWith('Achievements');
  });

  // it('navigates on update info button press', () => {
  //   const push = jest.fn();
  //   const { getByText } = render(<Provider store={store}><User navigation={{ push }} /></Provider>);
  //   fireEvent.press(getByText('Go to Camera'));
  //   expect(push).toHaveBeenCalledWith('Camera');
  // });
});


describe('UserPageStack', () => {
  it('renders the correct screen', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <UserPageStack />
      </NavigationContainer>
    );
    await waitFor(() => getByText('UserPage'));
  });
  })