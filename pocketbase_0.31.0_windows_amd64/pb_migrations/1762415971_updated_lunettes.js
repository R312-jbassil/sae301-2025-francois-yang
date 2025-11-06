/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_427234108")

  // remove field
  collection.fields.removeById("number1984990008")

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1984990008",
    "max": 0,
    "min": 0,
    "name": "taille",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_427234108")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number1984990008",
    "max": null,
    "min": null,
    "name": "taille",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("text1984990008")

  return app.save(collection)
})
