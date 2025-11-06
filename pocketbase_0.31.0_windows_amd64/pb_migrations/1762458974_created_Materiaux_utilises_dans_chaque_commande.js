/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
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
      },
      {
        "hidden": false,
        "id": "_clone_DoN5",
        "name": "date_commande",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      }
    ],
    "id": "pbc_1384447980",
    "indexes": [],
    "listRule": null,
    "name": "Materiaux_utilises_dans_chaque_commande",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  (ROW_NUMBER() OVER()) AS id,\n  commande.id AS commande_id,\n  commande.created AS date_commande,\n  commande.user AS user_id,\n  c_lunettes.lunette_id,\n  l.nom_creation,\n  lm.materiaux AS materiau_id,\n  m.libelle AS materiau_libelle\nFROM commande\nLEFT JOIN commande_lunettes AS c_lunettes ON commande.id = c_lunettes.commande_id\nLEFT JOIN lunettes AS l ON c_lunettes.lunette_id = l.id\nLEFT JOIN lunettes_materiau AS lm ON l.id = lm.lunette\nLEFT JOIN materiau AS m ON lm.materiaux = m.id",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1384447980");

  return app.delete(collection);
})
