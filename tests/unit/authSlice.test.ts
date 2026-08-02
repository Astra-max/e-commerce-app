import { describe, it, expect } from 'vitest';
import reducer, { setSession, logout } from '../../e-commerce/src/store/feature/authSlice';

describe('authSlice (unit)', () => {
  it('should set session data and mark authenticated', () => {
    const initial = reducer(undefined as any, { type: '@@INIT' } as any);
    const payload = {
      userId: 'u-1',
      userName: 'alice',
      firstName: 'Alice',
      accessToken: 'tok-123',
    };

    const next = reducer(initial, setSession(payload as any));
    expect(next.isAuthenticated).toBe(true);
    expect(next.user?.userId).toBe('u-1');
    expect(next.user?.userName).toBe('alice');
    expect(next.user?.firstName).toBe('Alice');
    expect(next.user?.token).toBe('tok-123');
  });

  it('should reset session on logout', () => {
    const initial = reducer(undefined as any, { type: '@@INIT' } as any);
    const loggedIn = reducer(initial, setSession({ userId: 'u-2', userName: 'bob' } as any));

    const afterLogout = reducer(loggedIn, logout());
    expect(afterLogout.isAuthenticated).toBe(false);
    expect(afterLogout.user?.userId).toBeNull();
    expect(afterLogout.user?.userName).toBeNull();
  });
});