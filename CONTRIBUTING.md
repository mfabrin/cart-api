
# Installation

Download the project and install dependencies via npm

```bash
npm install
```

Run the app
```bash
npm start
```

Run the test
```bash
npm test
```

Now server is listening on port 3000 and you can access endpoints by `http://localhost:3000`

You can customize the port by editing the file `.env`
# API Reference
Here are list of available endpoints and how to use it


### Create cart and add items

This API will create cart if not exists and add items 

#### Request
`PUT /cart/:ecommerceId/:customerId/items`

#### Body
```json
{
  "items": [{
    "product_sku": "string",
    "product_name": "string", 
    "file_type": "string",
    "quantity": "number",
    "delivery_date": "date"
  }]
}
```

#### Responses

```http
HTTP/1.1 201 Created
HTTP/1.1 204 No Content
HTTP/1.1 400 Bad Request
```

### View the Cart

#### Request
`GET /cart/:ecommerceId/:customerId`



#### Responses
```http
HTTP/1.1 200 OK
HTTP/1.1 400 Bad Request
```
```json
{
  "cart": {
    "ecommerce_id": "number", 
    "customer_id": "number", 
    "created_at": "date",
    "status": "string",
    "total_price": "number", 
    "item_list": [{
      "product_sku": "string",
      "product_name": "string", 
      "file_type": "string", 
      "quantity": "number", 
      "delivery_date": "date", 
      "unit_price": "number",
      "total_price": "number"
    }]
  }
}
```

### Cart checkout

#### Request
`PUT /cart/:ecommerceId/:customerId/checkout`


#### Responses
```http
HTTP/1.1 200 OK
HTTP/1.1 400 Bad Request
```