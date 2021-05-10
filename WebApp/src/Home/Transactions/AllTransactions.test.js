import React from 'react';
import { render, screen } from '@testing-library/react';
import AllTransactions from './';

describe("AllTransactions", () => {
  it('should take a snapshot of AllTransactions component', () => {
     const props = {};
    render(<AllTransactions {...props}/>);     
    const element = screen.getByText('View All Transactions');
    expect(element).toBeInTheDocument();
  });
});