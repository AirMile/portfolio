# Vitest + React Testing Library

## Configuration

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
```

## Query Priority (best → worst)

1. `getByRole` - Accessible queries
2. `getByLabelText` - Form fields
3. `getByPlaceholderText` - Inputs
4. `getByText` - Non-interactive
5. `getByTestId` - Last resort

## Patterns

### Render Component

```tsx
import { render, screen } from '@testing-library/react'
import { Component } from './Component'

test('renders correctly', () => {
  render(<Component />)
  expect(screen.getByRole('heading')).toBeInTheDocument()
})
```

### User Events

```tsx
import userEvent from '@testing-library/user-event'

test('handles click', async () => {
  const user = userEvent.setup()
  render(<Button onClick={fn} />)
  await user.click(screen.getByRole('button'))
  expect(fn).toHaveBeenCalled()
})
```

## Output Parsing

```
PASS  src/Component.test.tsx
FAIL  src/Other.test.tsx
  ✕ test name (15ms)
```
