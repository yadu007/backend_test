var mongoose = require("mongoose");

let project_model = require('../models/projects')
let equipment_model = require('../models/equipments')
let equipment_types_model = require('../models/equipment_types.js')
const ObjectID = require('mongodb').ObjectID;

async function add_project(req, res) {
    let project_name = req.body.project_name;
    let user_id = req.user._id
    let check_project_exists = await project_model.findOne({
        name: project_name,
        user_id: user_id
    })
    if (check_project_exists) {
        return res.status(401).json({
            message: 'Project Already Present For User'
        });
    } else {
        let project = await project_model.create({
            name: project_name,
            user_id: user_id
        })
        return res.status(200).json({
            message: project
        });
    }
}

async function add_equipment(req, res) {

    let project_id = req.body.project_id
    let project = await project_model.findOne({
        _id: project_id
    })
    if (project && project.user_id != req.user._id) {
        return res.status(400).json({
            message: 'Project Does Not Belong To The Requested User.'
        });
    } else {
        let name = req.body.equipment_name
        let type = req.body.equipment_type
        let parent = req.body.equipment_parent
        let property1 = req.body.equipment_property1
        let project_ = await equipment_model.create({
            name: name,
            type: ObjectID(type),
            parent: (parent) ? parent : null,
            property1: property1,
            project_id: ObjectID(project_id)
        })
        return res.status(200).json({
            message: project_
        });
    }
}

async function remove_equipment(req, res) {

    let project_id = req.body.project_id
    let project = await project_model.findOne({
        _id: project_id
    })
    if (project && project.user_id != req.user._id) {
        return res.status(400).json({
            message: 'Project Does Not Belong To The Requested User.'
        });
    }
    let equipment_id = req.body.equipment_id
    await equipment_model.deleteMany({
        _id: ObjectID(equipment_id)
    })
    let should_delete_children = req.body.delete_children
    if (should_delete_children) {
        let deleted = await equipment_model.deleteMany({
            parent: ObjectID(equipment_id)
        })
    }
    return res.status(200).json({
        message: "done"
    });
}

async function get_all_equipments(req, res) {

    let project_id = req.body.project_id
    let project = await project_model.findOne({
        _id: project_id
    })
    if (project && project.user_id != req.user._id) {
        return res.status(400).json({
            message: 'Project Does Not Belong To The Requested User.'
        });
    } else {
        let equipments = await equipment_model.find({
            project_id: project_id
        })
        // let equipment_dict = {}
        // equipments.forEach(equipment => {
        //     equipment_dict[equipment._doc._id] = equipment
        // });

        return res.status(200).json({
            message: equipments
        });
    }

}

async function get_equipment_details(req, res) {

    let project_id = req.body.project_id
    let equipment_id = req.body.equipment_id
    let project = await project_model.findOne({
        _id: project_id
    })
    if (project && project.user_id != req.user._id) {
        return res.status(400).json({
            message: 'Project Does Not Belong To The Requested User.'
        });
    }
    let equipment_check = await equipment_model.find({
        project_id: project_id,
        _id: equipment_id
    })
    if (!equipment_check || !equipment_check.length) {
        return res.status(400).json({
            message: 'Equipment Does Not Belong To The Given Project'
        });
    }
    return res.status(200).json({
        message: equipment_check[0]._doc
    });

}

async function get_all_equipment_types(req, res) {

    let equipment_types_model_ = await equipment_types_model.find({})
    if (equipment_types_model_ && equipment_types_model_.length) {
        return res.status(200).json({
            message: equipment_types_model_
        });
    } else {
        return res.status(400).json({
            message: 'Equipment Types Not Present'
        });
    }
}

async function get_all_projects(req, res) {

    let projects = await project_model.find({user_id:req.user._id})
    if(!projects || !projects.length){
        return res.status(400).json({
            message: "No Projects Found"
        });
    }
    return res.status(200).json({
        message: projects
    });
}

module.exports = {
    add_project,
    add_equipment,
    remove_equipment,
    get_all_equipments,
    get_equipment_details,
    get_all_equipment_types,
    get_all_projects
}