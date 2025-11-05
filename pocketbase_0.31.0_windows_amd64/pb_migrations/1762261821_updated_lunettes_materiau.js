/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_20062413")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_427234108",
    "hidden": false,
    "id": "relation2233221673",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "lunette",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1486587212",
    "hidden": false,
    "id": "relation2546296357",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "materiaux",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_20062413")

  // remove field
  collection.fields.removeById("relation2233221673")

  // remove field
  collection.fields.removeById("relation2546296357")

  return app.save(collection)
})
