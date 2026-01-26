# TDD Cycle

## RED-GREEN-REFACTOR

1. **RED**: Write failing test first
2. **GREEN**: Write minimal code to pass
3. **REFACTOR**: Clean up without breaking tests

## Test Naming

```ts
// Pattern: should [expected behavior] when [condition]
test('should display error when email is invalid', () => {})
```

## Arrange-Act-Assert

```ts
test('example', () => {
  // Arrange
  const data = { name: 'Test' }
  // Act
  const result = processData(data)
  // Assert
  expect(result).toBe('Processed: Test')
})
```
