import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('renders the navbar with the brand name', () => {
    render(<App />);
    expect(screen.getByText('MERN Stack')).toBeInTheDocument();
  });

  it('renders the home page heading after lazy load', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Cloud-Native');
    });
  });
});
