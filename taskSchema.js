const mongoose = require('mongoose');

const empToAdd = new mongoose.Schema({
    empName: {
        type : String,
        required : true
    },
    status: {
        type : String
    }
  },{ _id : false });

const taskSchema = new mongoose.Schema({
    taskname : {
        type : String,
        required : true
    },
    projectname : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    assignedDate : {
        type : String,
        required : true
    },
    deadline : {
        type :String,
        required : true
    },
    employeesToAdd : [empToAdd],
    status : {
        type : String,
        required : true
    }
});

// taskSchema.pre("save", async function (){
//     this.employeesToAdd._id = undefined;
// })

taskSchema.pre("save", async function (){
    // this.employeesToAdd._id = "0";
    this.employeesToAdd.map((e,i)=>{
        e.status = "assigned"
    })
})

// taskSchema.pre("findOneAndUpdate", async function (){
//     this.employeesToAdd = [];
//     this.employeesToAdd[0].status = "assigned"
//     // this.employeesToAdd.map((e)=>{
//     //     e.status = "assigned";
//     // })
// })

const taskModel = mongoose.model('task', taskSchema);
module.exports = taskModel;