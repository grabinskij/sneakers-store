import { render, screen } from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "./redux/store";

test('renders learn react link', () => {
  render(<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>);
  const linkElement = screen.queryByText(/learn react/i);
  expect(linkElement).toBeNull();
});
