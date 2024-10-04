import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from '.';

describe('Home page component', () => {
  it('should render correctly', async () => {
    render(<HomePage />);

    expect(screen.getByText('Testing Home page')).toBeInTheDocument();
  });
});
