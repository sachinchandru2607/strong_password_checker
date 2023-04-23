import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders App without crash', () => {
  render(<App />);
  const linkElement = screen.getByText(/password checker/i);
  expect(linkElement).toBeInTheDocument();
});

test('Check for a password with ->  a ', () => {
  render(<App />);
  const passwordField = screen.getByTestId("password")
  const minStepsField = screen.getByTestId("min-steps")
  const submitButton = screen.getByTestId("submit")
  fireEvent.change(passwordField,{target : {value : 'a'}})
  fireEvent.click(submitButton)
  expect(minStepsField.value).toBe('5')
});

test('Check for a password with ->  aA1', () => {
  render(<App />);
  const passwordField = screen.getByTestId("password")
  const minStepsField = screen.getByTestId("min-steps")
  const submitButton = screen.getByTestId("submit")
  fireEvent.change(passwordField,{target : {value : 'aA1'}})
  fireEvent.click(submitButton)
  expect(minStepsField.value).toBe('3')
});

test('Check for a password with ->  1337C0d3', () => {
  render(<App />);
  const passwordField = screen.getByTestId("password")
  const minStepsField = screen.getByTestId("min-steps")
  const submitButton = screen.getByTestId("submit")
  fireEvent.change(passwordField,{target : {value : '1337C0d3'}})
  fireEvent.click(submitButton)
  expect(minStepsField.value).toBe('0')
});