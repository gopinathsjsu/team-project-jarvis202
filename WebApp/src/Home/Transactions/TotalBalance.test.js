import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalBalance from './';

describe("RecentTransactions", () => {
  it('should render RecentTransactions component', () => {
     const props = {};
    render(<TotalBalance {...props} />);     
    const element = screen.getByText('Total Balance (Savings + Checkings)');
    expect(element).toBeInTheDocument();
  });
});