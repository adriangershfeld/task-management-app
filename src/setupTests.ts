import '@testing-library/jest-dom';
import 'vitest-mock';
import { vi } from 'vitest';
// Mock file imports
vi.mock('fileMock', () => ({ default: 'test-file-stub' }));

// Mock style imports
vi.mock('styleMock', () => ({ default: {} }));