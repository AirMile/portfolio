# Stack Baseline Research

Generated: 2026-01-26
Stack: React 19, Vite 6, TypeScript, Tailwind CSS v4
Valid until: 2026-04-26

## Framework Conventions

- Use functional components with hooks (no class components)
- Name components with PascalCase, hooks with `use` prefix
- Keep components focused on single responsibility
- Calculate derived state during render instead of storing it
- Use `useState` for local state, Context for global state
- Move helper functions inside `useEffect` when possible

## Recommended Patterns

- **State Status Pattern**: Use single status variable with union types (`'idle' | 'loading' | 'success' | 'error'`)
- **Parent-Child Data Flow**: Parent fetches data, passes down as props
- **Local Mutation**: Create/mutate arrays within render is safe
- **Query Priority**: getByRole > getByLabelText > getByText > getByTestId

## Common Idioms

- Updater functions: `setCount(c => c + 1)` or `setEnabled(e => !e)`
- Fragments: `<>...</>` for multiple elements without wrapper
- Conditional rendering: `{condition && <Component />}`
- Event handlers: `() => handleClick(id)` for passing arguments

## Testing Approach

- Use React Testing Library with Vitest
- Test behavior, not implementation
- Prefer `screen.getByRole` for accessible queries
- Use `userEvent` for interactions
- Use `findBy*` for async assertions

## Common Pitfalls

- Don't call hooks conditionally or in loops
- Don't mutate state directly, use setter functions
- Don't forget cleanup in useEffect
- Don't use index as key for dynamic lists
- Don't define components inside other components

## Context7 Sources

Libraries researched:
- /reactjs/react.dev
