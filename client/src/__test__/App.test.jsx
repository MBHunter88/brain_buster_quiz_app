
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from '../App';


test('renders without crashing', () => {
  render(<App />);
});

test('renders start button', () => {
  render(<App />);
  screen.getByRole('button'); 
})

