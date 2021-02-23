diff --git a/controllers/projects.js b/controllers/projects.js
index d0c7184..b2e40f1 100644
--- a/controllers/projects.js
+++ b/controllers/projects.js
@@ -5,6 +5,7 @@ let equipment_types_model = require('../models/equipment_types.js')
 let logger = require('../lib/logger')
 const ObjectID = require('mongodb').ObjectID;
 
+
 async function add_project(req, res) {
     let project_name = req.body.project_name;
     let user_id = req.user._id
@@ -152,6 +153,36 @@ async function get_all_projects(req, res) {
     });
 }
 
+async function getEquipmentListForUser(req, res) {
+    let json_eq = require('../json_datas/equipments.json')
+    return res.status(200).json(json_eq);
+}
+
+async function getEquipmentMonthlyVols(req, res) {
+    if(req.query.equipment_id == "558ddfdd3620c111fe112b4671b77c6d"){
+      let json_eq = require('../json_datas/meterMonthly.json')
+      return res.status(200).json(json_eq);
+      }
+
+    else if(req.query.equipment_id == "4107c0a4db3fa48dd9aac2701b32b143"){
+      let json_eq = require('../json_datas/tankMonthly.json')
+      return res.status(200).json(json_eq);
+      }
+  }
+
+async function getEquipmentDailyVols(req, res) {
+
+  if(req.query.equipment_id == "558ddfdd3620c111fe112b4671b77c6d"){
+    let json_eq = require('../json_datas/meterDaily.json')
+    return res.status(200).json(json_eq);
+    }
+
+  else if(req.query.equipment_id == "4107c0a4db3fa48dd9aac2701b32b143"){
+    let json_eq = require('../json_datas/tankDaily.json')
+    return res.status(200).json(json_eq);
+    }
+
+}
 module.exports = {
     add_project,
     add_equipment,
@@ -159,5 +190,9 @@ module.exports = {
     get_all_equipments,
     get_equipment_details,
     get_all_equipment_types,
-    get_all_projects
-}
\ No newline at end of file
+    get_all_projects,
+
+    getEquipmentListForUser,
+    getEquipmentMonthlyVols,
+    getEquipmentDailyVols
+}
diff --git a/package.json b/package.json
index 501fa75..3a89949 100644
--- a/package.json
+++ b/package.json
@@ -13,6 +13,7 @@
     "body-parser": "^1.19.0",
     "cors": "^2.8.5",
     "dotenv": "^8.2.0",
+    "electron": "^11.3.0",
     "express": "^4.17.1",
     "jsonwebtoken": "^8.5.1",
     "mongodb": "^3.6.4",
diff --git a/routers/projects.js b/routers/projects.js
index e50bb26..e69de29 100644
--- a/routers/projects.js
+++ b/routers/projects.js
@@ -1,18 +0,0 @@
-const express = require("express");
-const router = express.Router();
-
-const projectController = require('../controllers/projects')
-let userHandlers = require('../controllers/users');
-
-
-router.post("/add_project", userHandlers.loginRequired, projectController.add_project);
-router.post("/add_equipment", userHandlers.loginRequired, projectController.add_equipment);
-router.post("/remove_equipment", userHandlers.loginRequired, projectController.remove_equipment);
-router.post("/get_all_equipments", userHandlers.loginRequired, projectController.get_all_equipments);
-router.post("/get_equipment_details", userHandlers.loginRequired, projectController.get_equipment_details);
-router.post("/get_all_equipment_types", userHandlers.loginRequired, projectController.get_all_equipment_types);
-router.post("/get_all_projects", userHandlers.loginRequired, projectController.get_all_projects);
-
-
-module.exports = router
-
diff --git a/server.js b/server.js
index 7832333..af6828f 100644
--- a/server.js
+++ b/server.js
@@ -10,19 +10,19 @@ app.use(bodyParser.urlencoded({
 app.use(bodyParser.json());
 app.use(cors());
 
-(async () => {
-  try {
-    await mongoose.connect(process.env.QB_MONGO_URL, {
-      useCreateIndex: true,
-      useNewUrlParser: true
-    });
-    logger.info('Connected To MongoDB');
-
-  } catch (err) {
-    logger.error('Mongo Connection Error', err);
-
-  }
-})()
+// (async () => {
+//   try {
+//     await mongoose.connect(process.env.QB_MONGO_URL, {
+//       useCreateIndex: true,
+//       useNewUrlParser: true
+//     });
+//     logger.info('Connected To MongoDB');
+//
+//   } catch (err) {
+//     logger.error('Mongo Connection Error', err);
+//
+//   }
+// })()
 
 const routers = require('./routers')
 app.use('/', routers)
