import React from 'react';
import { render, screen } from '@testing-library/react';
import RecentTransactions from './';

describe("RecentTransactions", () => {
  it('should render RecentTransactions component', () => {
     const props = {};
    render(<RecentTransactions {...props} />);     
    const element = screen.getByText('Recent Transactions');
    expect(element).toBeInTheDocument();
  });
});