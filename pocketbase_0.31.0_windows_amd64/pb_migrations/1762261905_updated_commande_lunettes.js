/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_315968430")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_782564964",
    "hidden": false,
    "id": "relation2196385364",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "commande_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_427234108",
    "hidden": false,
    "id": "relation2274609426",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "lunette_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number2347911801",
    "max": null,
    "min": null,
    "name": "quantite",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_315968430")

  // remove field
  collection.fields.removeById("relation2196385364")

  // remove field
  collection.fields.removeById("relation2274609426")

  // remove field
  collection.fields.removeById("number2347911801")

  return app.save(collection)
})
