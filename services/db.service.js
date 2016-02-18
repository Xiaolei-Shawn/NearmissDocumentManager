var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var usersDb = db.get('users');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var dbService = {
	getOneTemplate: function(id){
		console.log("getone");
	},
	getAllTemplates: function(){

	},
	createTemplate: function(template) {
	    
	},
	 
	updateTemplate: function(template, id) {
	    
	},
	 
	deleteTemplate: function(id) {
	    
	},
	findUser: function(username, telephone, email){
		console.log("findUser in db dbService");
		if(username){

		} else if(telephone){

		} else if(email){

		}
		//For testing
		var dbUserObj = {  
	      name: 'arvind',
	      role: 'admin',
	      username: 'arvind@myapp.com'
	    };
	 
	    return dbUserObj;
	},
	validateUser: function(username, telephone, email, password){
		if(password){
			if(username){

			} else if(telephone){

			} else if(email){
				
			} 
		} else {

		}
		//For testing
		var dbUserObj = {  
	      name: 'arvind',
	      role: 'admin',
	      username: 'arvind@myapp.com'
	    };
	 
	    return dbUserObj;
	}
}

module.exports = dbService;