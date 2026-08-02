import { describe, it, expect } from 'vitest';
import reducer, {
  addToCart,
  upsertCartItem,
  addQuantity,
  reduceQuantity,
  addToTotal,
  reduceTotal,
} from '../../e-commerce/src/store/feature/cartSlice';

const sampleItem = {
  productid: 'p-1',
  name: 'Sample',
  price: 100,
  amount: 100,
  quantity: 1,
  status: 'active',
  userId: 'u-1',
};

describe('cartSlice (unit)', () => {
  it('should add item to cart', () => {
    const initial = reducer(undefined as any, { type: '@@INIT' } as any);
    const next = reducer(initial, addToCart(sampleItem as any));
    expect(next.cart.length).toBe(1);
    expect(next.cart[0].productid).toBe('p-1');
  });

  it('should upsert an existing item (increment quantity)', () => {
    const initial = reducer(undefined as any, { type: '@@INIT' } as any);
    const withItem = reducer(initial, addToCart(sampleItem as any));
    const updated = reducer(withItem, upsertCartItem({ ...sampleItem, quantity: 2 } as any));
    expect(updated.cart.length).toBe(1);
    expect(updated.cart[0].quantity).toBe(3); // existing 1 + 2
  });

  it('should add and reduce quantity by index', () => {
    const initial = reducer(undefined as any, { type: '@@INIT' } as any);
    const withItem = reducer(initial, addToCart(sampleItem as any));
    const plus = reducer(withItem, addQuantity(0));
    expect(plus.cart[0].quantity).toBe(2);
    const minus = reducer(plus, reduceQuantity(0));
    expect(minus.cart[0].quantity).toBe(1);
  });

  it('should update total add/reduce', () => {
    const initial = reducer(undefined as any, { type: '@@INIT' } as any);
    const t1 = reducer(initial, addToTotal(50));
    expect(t1.total).toBe(50);
    const t2 = reducer(t1, reduceTotal(20));
    expect(t2.total).toBe(30);
  });
});