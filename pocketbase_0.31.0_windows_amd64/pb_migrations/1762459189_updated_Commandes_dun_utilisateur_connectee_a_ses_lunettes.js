/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1235818745")

  // update collection data
  unmarshal({
    "listRule": "",
    "viewRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("_clone_jRfQ")

  // remove field
  collection.fields.removeById("_clone_72Z4")

  // remove field
  collection.fields.removeById("_clone_t3xu")

  // remove field
  collection.fields.removeById("_clone_bbod")

  // remove field
  collection.fields.removeById("_clone_Dext")

  // remove field
  collection.fields.removeById("_clone_tOs2")

  // remove field
  collection.fields.removeById("_clone_ryZE")

  // remove field
  collection.fields.removeById("_clone_qTMv")

  // remove field
  collection.fields.removeById("_clone_J3rH")

  // remove field
  collection.fields.removeById("_clone_MapA")

  // remove field
  collection.fields.removeById("_clone_nBQ1")

  // remove field
  collection.fields.removeById("_clone_g6m3")

  // remove field
  collection.fields.removeById("_clone_3bch")

  // remove field
  collection.fields.removeById("_clone_xmin")

  // remove field
  collection.fields.removeById("_clone_kSoi")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "_clone_Sfuq",
    "name": "date_commande",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "_clone_7DBV",
    "max": null,
    "min": null,
    "name": "montant_total",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_CsUq",
    "max": 0,
    "min": 0,
    "name": "statut",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_KHo2",
    "max": 0,
    "min": 0,
    "name": "adresse_domicile",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_ZpZl",
    "max": 0,
    "min": 0,
    "name": "mode_paiement",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_gL1s",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_427234108",
    "hidden": false,
    "id": "_clone_tumq",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "lunette_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_SIqJ",
    "max": 0,
    "min": 0,
    "name": "nom_lunette",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_GBJ2",
    "max": 0,
    "min": 0,
    "name": "forme",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_1u7v",
    "max": 0,
    "min": 0,
    "name": "mode_creation",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_xpSv",
    "max": 0,
    "min": 0,
    "name": "type_monture",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_9JBY",
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

  // add field
  collection.fields.addAt(14, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_yL1d",
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

  // add field
  collection.fields.addAt(15, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_4C4p",
    "max": 0,
    "min": 0,
    "name": "couleur_monture",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(16, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_2hcp",
    "max": 0,
    "min": 0,
    "name": "couleur_branches",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1235818745")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": null
  }, collection)

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "_clone_jRfQ",
    "name": "date_commande",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "_clone_72Z4",
    "max": null,
    "min": null,
    "name": "montant_total",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_t3xu",
    "max": 0,
    "min": 0,
    "name": "statut",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_bbod",
    "max": 0,
    "min": 0,
    "name": "adresse_domicile",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_Dext",
    "max": 0,
    "min": 0,
    "name": "mode_paiement",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_tOs2",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_427234108",
    "hidden": false,
    "id": "_clone_ryZE",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "lunette_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_qTMv",
    "max": 0,
    "min": 0,
    "name": "nom_lunette",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_J3rH",
    "max": 0,
    "min": 0,
    "name": "forme",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_MapA",
    "max": 0,
    "min": 0,
    "name": "mode_creation",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_nBQ1",
    "max": 0,
    "min": 0,
    "name": "type_monture",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_g6m3",
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

  // add field
  collection.fields.addAt(14, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_3bch",
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

  // add field
  collection.fields.addAt(15, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_xmin",
    "max": 0,
    "min": 0,
    "name": "couleur_monture",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(16, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_kSoi",
    "max": 0,
    "min": 0,
    "name": "couleur_branches",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("_clone_Sfuq")

  // remove field
  collection.fields.removeById("_clone_7DBV")

  // remove field
  collection.fields.removeById("_clone_CsUq")

  // remove field
  collection.fields.removeById("_clone_KHo2")

  // remove field
  collection.fields.removeById("_clone_ZpZl")

  // remove field
  collection.fields.removeById("_clone_gL1s")

  // remove field
  collection.fields.removeById("_clone_tumq")

  // remove field
  collection.fields.removeById("_clone_SIqJ")

  // remove field
  collection.fields.removeById("_clone_GBJ2")

  // remove field
  collection.fields.removeById("_clone_1u7v")

  // remove field
  collection.fields.removeById("_clone_xpSv")

  // remove field
  collection.fields.removeById("_clone_9JBY")

  // remove field
  collection.fields.removeById("_clone_yL1d")

  // remove field
  collection.fields.removeById("_clone_4C4p")

  // remove field
  collection.fields.removeById("_clone_2hcp")

  return app.save(collection)
})
