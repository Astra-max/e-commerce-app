import { describe, it, expect } from 'vitest';
import cartReducer, { upsertCartItem, addToTotal } from '../../e-commerce/src/store/feature/cartSlice';

describe('cart integration (integration)', () => {
  it('optimistic add: upsert then increase total', () => {
    const initial = cartReducer(undefined as any, { type: '@@INIT' } as any);
    const item = { productid: 'p-999', name: 'Integrate', price: 200, amount: 200, quantity: 1, status: 'ok', userId: 'u-test' } as any;
    const withItem = cartReducer(initial, upsertCartItem({ ...item, quantity: 1 }));
    const withTotal = cartReducer(withItem, addToTotal(item.amount));

    expect(withItem.cart.length).toBe(1);
    expect(withTotal.total).toBe(item.amount);
    // optimistic double add
    const again = cartReducer(withTotal, upsertCartItem({ ...item, quantity: 2 }));
    expect(again.cart[0].quantity).toBe(3);
  });
});