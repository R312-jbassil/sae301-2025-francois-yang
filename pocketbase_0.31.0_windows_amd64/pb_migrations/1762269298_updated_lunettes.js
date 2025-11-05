/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_427234108")

  // remove field
  collection.fields.removeById("text3319812137")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "select3319812137",
    "maxSelect": 1,
    "name": "type_verre",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Verres Clairs",
      "Solaires",
      "Anti-lumière bleu",
      "Progressif"
    ]
  }))

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "select1041995051",
    "maxSelect": 1,
    "name": "type_monture",
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

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3319812137",
    "max": 0,
    "min": 0,
    "name": "type_verre",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("select3319812137")

  // update field
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
})
