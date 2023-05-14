# Cart API Challenge

It's my first experience with NodeJS and I have used [Fastify](https://www.fastify.io/) to build endpoints to manage Cart for e-commerce.

The reason is that it seems that [ExpressJS](https://expressjs.com/) is the most used framework but the last release was one year ago.

Fastify is an open source framework actively maintained and I really liked to use it.

## Run Locally

Clone the project

```bash
git clone https://github.com/mfabrin/cart-api.git
```

Go to the project directory

```bash
cd cart-api
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run start
```

### Environments
Database connection and server port are stored inside `.env` file. 

I used mongodb to store the cart data; it was not requested by the challenge but I wanted to learn more about how NodeJS interact with database and I used [Mongoose](https://mongoosejs.com/).

## Running Tests

I've prepared two types of test: 
- One to test NodeJS server endpoints
- Other one to test functions that calculate cart total price and single item price based on policies.

This is the command to run tests for endpoints

```bash
npm run test:main
```

This is the command to run tests for price calculation
```bash
npm run test:calcs
```

## API Reference

I've added `swagger` to the project so all endpoints and schemas are better explained at this url `http://localhost:3000/docs`, but here is an overview of API.

Cart API comes with four endpoints:
- the API to create a cart
- the API to update a cart
- the API to view a cart
- the API to checkout a cart
- the API to delete a cart


#### Create a cart

```http
POST /api/v1/cart/create
```
Use this endpoint to create a new cart.

In the body of the request you have to specify `ecommerce_id`, `customer_id` to identify the cart plus `created_at`, `updated_at` and `status` fields.

Available values for `status` are `created`, `building`, `checkout`.

The success response is an `HTTP 201` with `ecommerce_id` and `customer_id` inside the body.

#### Update a cart
```http
PUT /api/v1/cart/update
```
Use this endpoint to update items inside a cart and change the status of the cart to `building`.

Inside the body you have to specify `ecommerce_id`, `customer_id` to identify the cart and the `item_list`.

Each entity in item_list has the following details: `product_sku`, `product_name`, `file_type`, `quantity`, `delivery_date`

Every time you call this API you will overwrite cart items with new ones.

The success response is an `HTTP 200` with all the informations about cart: 
```json
{
    "ecommerce_id": "string",
    "customer_id": "string", 
    "created_at": "date-time",
    "updated_at": "date-time", 
    "status": "string",
    "total_price": 0, 
    "item_list": [{
        "product_sku": "string",
        "product_name": "string",
        "file_type": "string",
        "quantity": 0,
        "delivery_date": "date-time", 
        "calculated_price": 0,
    }]
}
```

#### Get a cart
```http
GET /api/v1/cart/{ecommerce_id}/{customer_id}
```
Use this endpoint to view a cart.

As url segment, you have to specify the `ecommerce_id` and the `customer_id` to identify the cart.

The success response is an `HTTP 200` with the cart:
```json
{
    "ecommerce_id": "string",
    "customer_id": "string", 
    "created_at": "date-time",
    "updated_at": "date-time", 
    "status": "string",
    "total_price": 0, 
    "item_list": [{
        "product_sku": "string",
        "product_name": "string",
        "file_type": "string",
        "quantity": 0,
        "delivery_date": "date-time", 
        "calculated_price": 0,
    }]
}
```

#### Checkout a cart
```http
PUT /api/v1/cart/checkout
```
Use this endpoint to checkout a cart.

This API will set the `status` field to `checkout` and a value to `date_checkout` field.

In the body of the request you have to specify `ecommerce_id`, `customer_id` to identify the cart.


The success response is an `HTTP 200` with the cart:

```json
{
    "ecommerce_id": "string",
    "customer_id": "string", 
    "created_at": "date-time",
    "updated_at": "date-time", 
    "status": "string",
    "total_price": 0, 
    "item_list": [{
        "product_sku": "string",
        "product_name": "string",
        "file_type": "string",
        "quantity": 0,
        "delivery_date": "date-time", 
        "calculated_price": 0,
    }]
}
```

#### Cart delete
```http
DELETE /api/v1/cart/delete
```
Use this endpoint to delete a cart.

In the body of the request you have to specify `ecommerce_id`, `customer_id` to identiy the cart.

The success response is an `HTTP 204` with an empty body.
