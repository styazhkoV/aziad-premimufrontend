# 🍕 Aziad Pizza Project — Техническое Задание

## 📑 Business Requirements (BRD)

*   Онлайн‑меню с 11 видами пиццы и 6 напитками
*   Регистрация клиентов с контактными данными
*   Оформление заказа (пицца + напитки)
*   Оплата через Kaspi QR, карту или наличные
*   Отслеживание статуса заказа (Pending, Paid, Completed)
*   История заказов для клиентов

## 📑 Functional Requirements (FRD)

### API эндпоинты

*   `GET /api/Pizzas` — список пицц
*   `GET /api/Drinks` — список напитков
*   `GET /api/Orders` — список заказов
*   `POST /api/Orders` — создание заказа
*   `PUT /api/Orders/{id}` — обновление статуса
*   `GET /api/Customers` — список клиентов
*   `POST /api/Payments` — регистрация платежа

### Сценарии

1.  Клиент выбирает пиццу и напитки → создаётся заказ
2.  Заказ связывается с клиентом
3.  Оплата фиксируется в таблице `Payments`
4.  Статус заказа обновляется и отображается в UI

## 📊 ER‑диаграмма

```
@startuml
entity Pizza {
  Id : int <<PK>>
  Name : string
  Price : int
  Description : string
}

entity Drink {
  Id : int <<PK>>
  Name : string
  Price : int
  Description : string
}

entity Customer {
  Id : int <<PK>>
  Name : string
  Phone : string
  Email : string
  Address : string
}

entity Order {
  Id : int <<PK>>
  CustomerId : int <<FK>>
  Date : datetime
  Status : string
  Total : decimal
}

entity OrderItem {
  Id : int <<PK>>
  OrderId : int <<FK>>
  PizzaId : int <<FK>>
  Quantity : int
  Price : decimal
}

entity Payment {
  Id : int <<PK>>
  OrderId : int <<FK>>
  Method : string
  Status : string
  TransactionId : string
}

Pizza ||--o{ OrderItem
Drink ||--o{ OrderItem
Customer ||--o{ Order
Order ||--o{ OrderItem
Order ||--o{ Payment
@enduml
```