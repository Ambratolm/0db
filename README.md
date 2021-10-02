> ### 🚧 Work in progress...

# 🔴 0db

[![NPM version](https://badge.fury.io/js/0db.svg)](https://npmjs.org/package/0db)

<!-- [![Build Status](https://travis-ci.org/Ambratolm/0db.svg?branch=master)](https://travis-ci.org/Ambratolm/0db) -->

Simple JSON file based database with easy querying interface and common utilities.

> For whatever reason, If you don't want to use a real database, and instead simply use a file. but also want some query and utility functions of a database. this is **0db** 😁.

👇 Glimpse example :

```js
db("users").create({ name: "kenza", email: "kenza@old.com" });
db("users").read({ name: "kenza" });
db("users").update({ name: "kenza" }, { email: "kenza@new.com" });
db("users").delete({ name: "kenza" });
```

<!-- toc -->

- [📥 Installation](#%F0%9F%93%A5-installation)
- [🏁 Getting Started](#%F0%9F%8F%81-getting-started)
- [📕 Initialize](#%F0%9F%93%95-initialize)
- [📕 CREATE](#%F0%9F%93%95-create)
  * [📕 CREATE Queries](#%F0%9F%93%95-create-queries)
  * [📕 CREATE Options](#%F0%9F%93%95-create-options)
  * [📕 CREATE Examples](#%F0%9F%93%95-create-examples)
- [📕 READ](#%F0%9F%93%95-read)
  * [📕 READ Queries](#%F0%9F%93%95-read-queries)
  * [📕 READ Options](#%F0%9F%93%95-read-options)
  * [📕 READ Examples](#%F0%9F%93%95-read-examples)
- [📕 UPDATE](#%F0%9F%93%95-update)
  * [📕 UPDATE Queries](#%F0%9F%93%95-update-queries)
  * [📕 UPDATE Options](#%F0%9F%93%95-update-options)
  * [📕 UPDATE Examples](#%F0%9F%93%95-update-examples)
- [📕 DELETE](#%F0%9F%93%95-delete)
  * [📕 DELETE Queries](#%F0%9F%93%95-delete-queries)
  * [📕 DELETE Options](#%F0%9F%93%95-delete-options)
  * [📕 DELETE Examples](#%F0%9F%93%95-delete-examples)
- [📕 Other](#%F0%9F%93%95-other)
- [📃 License](#%F0%9F%93%83-license)

<!-- tocstop -->

## 📥 Installation

```bash
npm i 0db
```

## 🏁 Getting Started

👇 Learn by a simple common example :

```js
// Require library
const $0db = require("0db");

// Initialize database
// 💡 By default, A "db.json" file will be created in root directory
const db = await $0db();

// Create a new item within a collection named "users"
// 💡 If the collection doesn't exist it will be created automatically
// 💡 With the utility option "encrypt", the "password" field
//    will be saved as an encrypted hash string instead of the original
const createdUser = await db("users").create(
  {
    name: "kenza",
    email: "kenza@email.com",
    password: "secret123",
  },
  {
    encrypt: "password",
  }
);

// Read all items from "users" collection where "name" is "kenza"
// 💡 The "omit" option hides the "password" and "email"
//    fields in the returned results
const users = await db("users").read(
  { name: "kenza" },
  {
    omit: ["password", "email"],
  }
);

// Update all "users" items where "name" is "kenza"
// with new values for "email" and "password"
const updatedUser = await db("users").update(
  { name: "kenza" },
  {
    email: "kenza@NewEmail.com",
    password: "NEW_SECRET_123456789",
  }
);

// Delete all "users" items where "email" is "kenza@NewEmail.com"
const deletedUser = await db("users").update({ email: "kenza@NewEmail.com" });
```

💡 A JSON file named `db.json` (by default) is created in the root directory. This is an example of its content :

```json
{
  "users": [
    {
      "name": "kenza",
      "email: "kenza@example.com",
      "$id": "8c8f128e-4905-4e77-b664-e03f6de5e952",
      "$createdAt": "2021-09-05T21:40:27Z"
    },
    {
      "name": "ambratolm",
      "email: "ambratolm@example.com",
      "$id": "5211133c-a183-4c99-90ab-f857adf5442a",
      "$createdAt": "2002-11-01T22:12:55Z",
      "$updatedAt": "2021-10-02T00:00:00Z"
    }
  ]
}
```

💡 Note that the `$id` and `$createdAt` fields are created automatically when an item is created, and `$updatedAt` when it is updated.

## 📕 Initialize

```js
// Initialize with a "db.json" file in the root directory
const db = await fsdb();

// Initialize with a custom named JSON file in the root directory
const db = await fsdb("my-database-file.json");

// Initialize with a custom named JSON file in the current directory
const db = await fsdb(__dirname + "/my-database-file");
```

## 📕 CREATE

```js
await db(collectionName).create(item, options);
```

Creates a new item in a collection.<br />
💡 If the specified collection doesn't exist it will be created automatically.<br />
💡 The created item is returned.

| Parameter      | Type   | Default | Description                             |
| -------------- | ------ | ------- | --------------------------------------- |
| collectionName | String |         | Targeted collection name                |
| item           | Object | {}      | Item to create                          |
| options        | Object | {}      | CREATE options                          |
| **@returns**   | Object |         | The created item                        |
| **@throws**    | Error  |         | If a unique field value is already used |
| **@throws**    | Error  |         | If a value to encrypt is not a string   |

### 📕 CREATE Queries

> No queries.

### 📕 CREATE Options

| Property | Type     | Default | Description                     |
| -------- | -------- | ------- | ------------------------------- |
| unique   | string[] | []      | Fields to make unique           |
| encrypt  | string[] | []      | Fields to encrypt               |
| pick     | string[] | []      | Fields to pick in returned item |
| omit     | string[] | []      | Fields to omit in returned item |
| nocase   | boolean  | false   | Ignore case in search           |

### 📕 CREATE Examples

```js
// Create an item within a collection named "players" (automatically created)
// The created item is returned
const createdPlayer = await db("players").create({
  name: "ambratolm",
  level: 99,
  inventory: ["sword", "shield", "potion"],
});

// Create an item within a collection named "players" with some options
const createdPlayer = await db("players").create(
  {
    name: "ambratolm",
    level: 99,
    inventory: ["sword", "shield", "potion"],
    password: "this_is_a_secret",
  },
  {
    // Options
    unique: ["name"], // Make "name" field unique
    encrypt: ["password"], // Encrypt "password" field
    omit: ["password", "level"], // Omit fields in the returned item object
    nocase: true, // Ignore case when comparing strings
  }
);
```

## 📕 READ

```js
await db(collectionName).read(query, options);
```

Reads an existing item in a collection.<br />
💡 If the specified collection doesn't exist it will be created automatically.<br />
💡 The read items are returned.

| Parameter      | Type   | Default | Description                       |
| -------------- | ------ | ------- | --------------------------------- |
| collectionName | String |         | Targeted collection name          |
| query          | Object | {}      | Query object or function          |
| options        | Object | {}      | Additional options                |
| **@returns**   | Array  |         | The read item                     |
| **@throws**    | Error  |         | If an encrypted field not matched |

### 📕 READ Queries

🚧 ...

### 📕 READ Options

🚧 ...

### 📕 READ Examples

```js
// Read all items in "players" collection
const players = await db("players").read();

// Read items matching a query object
const somePlayers = await db("players").read({ name: "ambratolm" });

// Read items matching a query function
const someOtherPlayers = await db("players").read(
  (player) => player.level >= 90
);

// Read items matching a query with some options
const player = await db("players").read(
  { name: "AmBrAtOlM" },
  {
    // Options
    nocase: true, // Ignore case when comparing strings
    one: true, // return only one result (an object instead of array)
  }
);
```

## 📕 UPDATE

```js
await db(collectionName).update(query, changes, options);
```

Updates an existing item in a collection.<br />
💡 If the specified collection doesn't exist it will be created automatically.<br />
💡 The updated items are returned.

| Parameter      | Type   | Default | Description                             |
| -------------- | ------ | ------- | --------------------------------------- |
| collectionName | String |         | Targeted collection                     |
| query          | Object | {}      | Query object or function                |
| changes        | Object | {}      | Changes to apply                        |
| options        | Object | {}      | Additional options                      |
| **@returns**   | Array  |         | The updated item                        |
| **@throws**    | Error  |         | If Items matching query not found       |
| **@throws**    | Error  |         | If a unique field value is already used |
| **@throws**    | Error  |         | If a value to encrypt is not a string   |

### 📕 UPDATE Queries

🚧 ...

### 📕 UPDATE Options

🚧 ...

### 📕 UPDATE Examples

```js
// Update item(s)
// The updated item is returned
const updatedPlayer = await db("players").update(
  { name: "ambratolm" }, // Query can also be a function
  { name: "new name", level: 0 } // Changes to apply
);

// Update item(s) with some options
const updatedPlayer = await db("players").update(
  { name: "ambratolm" }, // Query can also be a function
  { name: "new name", level: 0 }, // Changes to apply
  {
    // Options
  }
);
```

## 📕 DELETE

```js
await db(collectionName).delete(query, options);
```

Deletes an existing item in a collection.<br />
💡 If the specified collection doesn't exist it will be created automatically.<br />
💡 The deleted item is returned.

| Parameter      | Type   | Default | Description                       |
| -------------- | ------ | ------- | --------------------------------- |
| collectionName | string |         | Targeted collection               |
| query          | object | {}      | Query object or function          |
| options        | object | {}      | Additional options                |
| **@returns**   | object |         | The deleted item                  |
| **@throws**    | Error  |         | If Items matching query not found |

### 📕 DELETE Queries

🚧 ...

### 📕 DELETE Options

🚧 ...

### 📕 DELETE Examples

```js
// Delete item(s)
// The deleted item is returned
const deletedPlayer = await db("players").delete(
  { name: "ambratolm" } // Query can also be a function
);

// Delete item(s) with some options
const deletedPlayer = await db("players").delete(
  { name: "ambratolm" }, // Query can also be a function
  {
    // Options
  }
);
```

## 📕 Other

```js
// Remove all collections
await db.drop();

// Remove a collection named "players"
await db("players").drop();

// Remove all items in a collection named "players" and keep it
await db("players").clear();
```

## 📃 License

[MIT](./LICENSE) © [Ambratolm](https://github.com/Ambratolm)
