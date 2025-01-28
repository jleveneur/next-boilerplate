import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

const ReactComponent = () => {
  return <div>React Component</div>;
};

describe('ReactComponent', () => {
  test('should render', () => {
    render(<ReactComponent />);

    expect(screen.getByText('React Component')).toBeInTheDocument();
  });
});
