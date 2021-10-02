> ### 🚧 Work in progress...

# 🔴 0db

[![NPM version](https://badge.fury.io/js/0db.svg)](https://npmjs.org/package/0db)
[![Build Status](https://travis-ci.org/Ambratolm/0db.svg?branch=master)](https://travis-ci.org/Ambratolm/0db)

Simple JSON file based database with easy querying interface and common utilities.

## Installation

```sh
npm i 0db
```

## Usage

```js
// Require library
const $0db = require('0db');

// Initialize database
const db = await $0db();

// Create a new item within a collection named "users"
// If the collection doesn't exist it will be created automatically
const createdUser = await db("users").create({
  name: "ambratolm",
  email: "ambratolm@example.com"
});

// Read all items from "users" collection
const users = await db("users").read();

// Update all "users" items where "name" filed equals "ambratolm"
// with a new value for "email"
const createdUser = await db("users").update({ name:"ambratolm"}, {
  email: "ambratolm@sample.com"
});

// Delete all "users" items where "name" filed equals "ambratolm"
const deletedUser = await db("users").update({ name:"ambratolm"});
```
A JSON file named `db.json` (by default) will be created in the current directory with the following content:

```json
{
  "users": [
    {
      "name": "ambratolm",
      "email: "ambratolm@example.com",
      "$id": "c8256c53-44ba-4ef4-bc89-e6e9a400fc0c",
      "$createdAt": "2020-09-28T02:01:39.064Z",
      "$updatedAt": "2020-09-28T02:03:50.064Z"
    }
  ]
}
```
Note that the `$id` and `$createdAt` fields are created automatically when an item is created, and `$updatedAt` when it is updated.

## License

MIT © [Ambratolm](https://github.com/Ambratolm)
