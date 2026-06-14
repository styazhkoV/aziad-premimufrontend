export const API_BASE = '/api';

export interface Pizza {
  id: number;
  name: string | null;
  price: number;
  description: string | null;
}

export interface Drink {
  id: number;
  name: string | null;
  price: number;
  description: string | null;
}

export interface Customer {
  id: number;
  name: string | null;
  phone: string | null;
  email?: string | null;
  address?: string | null;
}

export interface OrderItem {
  pizzaId?: number;
  drinkId?: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  customerId: number;
  date: string;
  status: string;
  total: number;
  items?: OrderItem[];
}

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  date: string;
  status: string;
  method?: string | null;
}

async function parseResponse(res: Response) {
  const text = await res.text();
  if (!res.ok) {
    console.error(`API Error ${res.status} - ${res.url}:`, text);
    throw new Error(text || `HTTP ${res.status}`);
  }
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (e) {
    // non-json (204 NoContent)
    return null;
  }
}

// ----- Pizzas -----
export async function fetchPizzas(): Promise<Pizza[]> {
  const res = await fetch(`${API_BASE}/Pizzas`);
  const data = await parseResponse(res);
  console.log('fetchPizzas', res.status, data);
  return (data as Pizza[]) || [];
}

export async function fetchPizzaById(id: number): Promise<Pizza | null> {
  const res = await fetch(`${API_BASE}/Pizzas/${id}`);
  const data = await parseResponse(res);
  console.log('fetchPizzaById', res.status, data);
  return (data as Pizza) || null;
}

export async function createPizza(payload: Omit<Pizza, 'id'>): Promise<Pizza | null> {
  const res = await fetch(`${API_BASE}/Pizzas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await parseResponse(res);
  console.log('createPizza', res.status, data);
  return (data as Pizza) || null;
}

export async function updatePizza(id: number, payload: Partial<Pizza>): Promise<void> {
  const res = await fetch(`${API_BASE}/Pizzas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  await parseResponse(res);
  console.log('updatePizza', res.status);
}

export async function deletePizza(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/Pizzas/${id}`, { method: 'DELETE' });
  await parseResponse(res);
  console.log('deletePizza', res.status);
}

// ----- Drinks -----
export async function fetchDrinks(): Promise<Drink[]> {
  const res = await fetch(`${API_BASE}/Drinks`);
  const data = await parseResponse(res);
  console.log('fetchDrinks', res.status, data);
  return (data as Drink[]) || [];
}

export async function fetchDrinkById(id: number): Promise<Drink | null> {
  const res = await fetch(`${API_BASE}/Drinks/${id}`);
  const data = await parseResponse(res);
  console.log('fetchDrinkById', res.status, data);
  return (data as Drink) || null;
}

export async function createDrink(payload: Omit<Drink, 'id'>): Promise<Drink | null> {
  const res = await fetch(`${API_BASE}/Drinks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await parseResponse(res);
  console.log('createDrink', res.status, data);
  return (data as Drink) || null;
}

export async function updateDrink(id: number, payload: Partial<Drink>): Promise<void> {
  const res = await fetch(`${API_BASE}/Drinks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  await parseResponse(res);
  console.log('updateDrink', res.status);
}

export async function deleteDrink(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/Drinks/${id}`, { method: 'DELETE' });
  await parseResponse(res);
  console.log('deleteDrink', res.status);
}

// ----- Customers -----
export async function fetchCustomers(): Promise<Customer[]> {
  const res = await fetch(`${API_BASE}/Customers`);
  const data = await parseResponse(res);
  console.log('fetchCustomers', res.status, data);
  return (data as Customer[]) || [];
}

export async function fetchCustomerById(id: number): Promise<Customer | null> {
  const res = await fetch(`${API_BASE}/Customers/${id}`);
  const data = await parseResponse(res);
  console.log('fetchCustomerById', res.status, data);
  return (data as Customer) || null;
}

export async function fetchCustomerByPhone(phone: string): Promise<Customer | null> {
  const res = await fetch(`${API_BASE}/Customers/phone/${encodeURIComponent(phone)}`);
  const data = await parseResponse(res);
  console.log('fetchCustomerByPhone', res.status, data);
  return (data as Customer) || null;
}

export async function createCustomer(payload: Omit<Customer, 'id'>): Promise<Customer | null> {
  const res = await fetch(`${API_BASE}/Customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await parseResponse(res);
  console.log('createCustomer', res.status, data);
  return (data as Customer) || null;
}

export async function updateCustomer(id: number, payload: Partial<Customer>): Promise<void> {
  const res = await fetch(`${API_BASE}/Customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  await parseResponse(res);
  console.log('updateCustomer', res.status);
}

export async function deleteCustomer(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/Customers/${id}`, { method: 'DELETE' });
  await parseResponse(res);
  console.log('deleteCustomer', res.status);
}

// ----- Orders -----
export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${API_BASE}/Orders`);
  const data = await parseResponse(res);
  console.log('fetchOrders', res.status, data);
  return (data as Order[]) || [];
}

export async function fetchOrderById(id: number): Promise<Order | null> {
  const res = await fetch(`${API_BASE}/Orders/${id}`);
  const data = await parseResponse(res);
  console.log('fetchOrderById', res.status, data);
  return (data as Order) || null;
}

export async function fetchOrdersByCustomer(customerId: number): Promise<Order[]> {
  const res = await fetch(`${API_BASE}/Orders/customer/${customerId}`);
  const data = await parseResponse(res);
  console.log('fetchOrdersByCustomer', res.status, data);
  return (data as Order[]) || [];
}

export async function createOrder(payload: Omit<Order, 'id'>): Promise<Order | null> {
  const res = await fetch(`${API_BASE}/Orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await parseResponse(res);
  console.log('createOrder', res.status, data);
  return (data as Order) || null;
}

export async function deleteOrder(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/Orders/${id}`, { method: 'DELETE' });
  await parseResponse(res);
  console.log('deleteOrder', res.status);
}

export async function updateOrderStatus(id: number, status: string): Promise<void> {
  const res = await fetch(`${API_BASE}/Orders/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  await parseResponse(res);
  console.log('updateOrderStatus', res.status);
}

// ----- Payments -----
export async function fetchPayments(): Promise<Payment[]> {
  const res = await fetch(`${API_BASE}/Payments`);
  const data = await parseResponse(res);
  console.log('fetchPayments', res.status, data);
  return (data as Payment[]) || [];
}

export async function fetchPaymentById(id: number): Promise<Payment | null> {
  const res = await fetch(`${API_BASE}/Payments/${id}`);
  const data = await parseResponse(res);
  console.log('fetchPaymentById', res.status, data);
  return (data as Payment) || null;
}

export async function fetchPaymentsByOrder(orderId: number): Promise<Payment[]> {
  const res = await fetch(`${API_BASE}/Payments/order/${orderId}`);
  const data = await parseResponse(res);
  console.log('fetchPaymentsByOrder', res.status, data);
  return (data as Payment[]) || [];
}

export async function createPayment(payload: Omit<Payment, 'id'>): Promise<Payment | null> {
  const res = await fetch(`${API_BASE}/Payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await parseResponse(res);
  console.log('createPayment', res.status, data);
  return (data as Payment) || null;
}

export async function deletePayment(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/Payments/${id}`, { method: 'DELETE' });
  await parseResponse(res);
  console.log('deletePayment', res.status);
}

export async function updatePaymentStatus(id: number, status: string): Promise<void> {
  const res = await fetch(`${API_BASE}/Payments/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  await parseResponse(res);
  console.log('updatePaymentStatus', res.status);
}

