# 🍕 Aziad Pizza API & [Frontend](https://styazhkov.github.io/aziad-premiumfrontend.github.io/) 

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

## 📊 ER‑диаграмм

```
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
```

## 🎨 Frontend (Astro + TypeScript)

### Страницы

Главная — список пицц и напитков

Корзина — выбранные позиции

Оформление заказа — форма клиента

История заказов — список прошлых заказов

### Компоненты

`PizzaCard.astro` — карточка пиццы

`DrinkCard.astro` — карточка напитка

`OrderForm.astro` — форма заказа

`OrderList.astro` — список заказов

### API интеграция

Используется `src/lib/api.ts` с функциями:

`fetchPizzas()`

`fetchDrinks()`

`fetchOrders()`

Логгирование через `console.log` для отладки

## 🚀 Установка и запуск

```
# Backend
cd Aziad
dotnet ef database update
dotnet run

# Frontend
cd aziad-premimufrontend
npm install
npm run dev
```

Swagger доступен по адресу: http://localhost:5000/swagger

Frontend доступен по адресу: http://localhost:3000/