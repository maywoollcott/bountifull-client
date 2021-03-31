import React from "react";
import * as renderer from "react-test-renderer";
import store from "../../store";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import Dashboard, { DashboardStack, Details } from "./Landing";
import { fireEvent, render, waitFor } from "react-native-testing-library";
import { NavigationContainer } from "@react-navigation/native";

// import App from "./App";
import Dashboard from "./Dashboard";

describe("<Dashboard />", () => {
  it("has 1 child", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PaperProvider>
            <Dashboard />
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
            <Dashboard />
          </PaperProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toBeTruthy();
  });

  it('navigates on details button press', () => {
    const push = jest.fn();
    const { getByText } = render(<Provider store={store}><Dashboard navigation={{ push }} /></Provider>);
    fireEvent.press(getByText('Go to Details'));
    expect(push).toHaveBeenCalledWith('Details');
  });
});


describe('DashboardStack', () => {
  it('renders the correct screen', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <DashboardStack />
      </NavigationContainer>
    );
    await waitFor(() => getByText('Dashboard'));
  });
  })