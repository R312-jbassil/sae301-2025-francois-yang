/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_427234108")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "select1041995051",
    "maxSelect": 1,
    "name": "monture",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Aviateur",
      "Wayfarer",
      "Rond",
      "Cat_Eye"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_427234108")

  // remove field
  collection.fields.removeById("select1041995051")

  return app.save(collection)
})
