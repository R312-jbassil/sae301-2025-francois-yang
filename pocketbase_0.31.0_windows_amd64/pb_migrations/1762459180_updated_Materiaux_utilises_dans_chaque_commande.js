/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1384447980")

  // update collection data
  unmarshal({
    "listRule": "",
    "viewRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("_clone_DoN5")

  // remove field
  collection.fields.removeById("_clone_ZSQU")

  // remove field
  collection.fields.removeById("_clone_mUKm")

  // remove field
  collection.fields.removeById("_clone_ZwZg")

  // remove field
  collection.fields.removeById("_clone_uBvp")

  // remove field
  collection.fields.removeById("_clone_Ru5I")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "_clone_d7oc",
    "name": "date_commande",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_vqUx",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_427234108",
    "hidden": false,
    "id": "_clone_KtmD",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "lunette_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_35eP",
    "max": 0,
    "min": 0,
    "name": "nom_creation",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1486587212",
    "hidden": false,
    "id": "_clone_yCTH",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "materiau_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_ZPqJ",
    "max": 0,
    "min": 0,
    "name": "materiau_libelle",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1384447980")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": null
  }, collection)

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "_clone_DoN5",
    "name": "date_commande",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_ZSQU",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_427234108",
    "hidden": false,
    "id": "_clone_mUKm",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "lunette_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_ZwZg",
    "max": 0,
    "min": 0,
    "name": "nom_creation",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1486587212",
    "hidden": false,
    "id": "_clone_uBvp",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "materiau_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_Ru5I",
    "max": 0,
    "min": 0,
    "name": "materiau_libelle",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("_clone_d7oc")

  // remove field
  collection.fields.removeById("_clone_vqUx")

  // remove field
  collection.fields.removeById("_clone_KtmD")

  // remove field
  collection.fields.removeById("_clone_35eP")

  // remove field
  collection.fields.removeById("_clone_yCTH")

  // remove field
  collection.fields.removeById("_clone_ZPqJ")

  return app.save(collection)
})
