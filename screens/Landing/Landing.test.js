import React from "react";
import * as renderer from "react-test-renderer";
import store from "../../store";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import Landing, { LandingStack, Registration } from "./Landing";
import { fireEvent, render, waitFor } from "react-native-testing-library";
import { NavigationContainer } from "@react-navigation/native";

describe("<Landing />", () => {
  it("has 1 child", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PaperProvider>
            <Landing />
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
            <Landing />
          </PaperProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toBeTruthy();
  });

  it('navigates on submit button press', () => {
    const push = jest.fn();
    const { getByText } = render(<Provider store={store}><Landing navigation={{ push }} /></Provider>);
    fireEvent.press(getByText('Go to Registration'));
    expect(push).toHaveBeenCalledWith('Registration');
  });

});

describe('LandingStack', () => {
  it('renders the correct screen', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <LandingStack />
      </NavigationContainer>
    );
    await waitFor(() => getByText('Landing'));
  });
  })