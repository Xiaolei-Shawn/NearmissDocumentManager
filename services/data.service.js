var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var usersDb = db.get('users');
var templateCollection = db.get('template');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var dataService = {
	getOneTemplate: function(id){
		var deferred = Q.defer();

    	templateCollection.findById('id', function (err, template) {
	        if (err) deferred.reject(err);

	        if (template) {
	            deferred.resolve(_.omit(template, 'hash'));
	        } else {
	            // template not found
	            deferred.resolve();
	        }
    	});

    	return deferred.promise;
	},
	getAllTemplates: function(){
		var deferred = Q.defer();

    	templateCollection.find({}, function (err, templates) {
	        if (err) deferred.reject(err);

	        if (templates) {
	            deferred.resolve(templates);
	        } else {
	            // template not found
	            deferred.resolve();
	        }
    	});

    	return deferred.promise;
	},
	createTemplate: function(template) {
		var deferred = Q.defer();

    	templateCollection.insert(template, function (err, template) {
	        if (err) deferred.reject(err);

	        if (template) {
	            deferred.resolve(template);
	        } else {
	            // template insert failed
	            deferred.resolve();
	        }
    	});

    	return deferred.promise;
	},
	 
	updateTemplate: function(template, id) {
	    
	},
	 
	deleteTemplate: function(id) {
	    
	},
	findUser: function(email, telephone){
		var deferred = Q.defer();

		if(telephone){
			usersDb.findOne({telephoneNumber: telephone}, function (err, user) {
		        if (err) deferred.reject(err);

		        if (user) {
		            deferred.resolve(_.omit(user, 'hash'));
		        } else {
		            deferred.resolve();
		        }
		     })  
		} else if(email){
			usersDb.findOne({email: email}, function (err, user) {
		        if (err) deferred.reject(err);

		        if (user) {
		            deferred.resolve(_.omit(user, 'hash'));
		        } else {
		            deferred.resolve();
		        }
		    })
		}
		return deferred.promise;
		//For testing
		/*var dbUserObj = {  
	      name: 'arvind',
	      role: 'admin',
	      username: 'arvind@myapp.com'
	    };
	 
	    return dbUserObj;*/
	},
	validateUser: function(email, telephone, password){
		if(password){
			var deferred = Q.defer();

			if(telephone){
				usersDb.findOne({phoneNumber: telephone}, function (err, user) {
			        if (err) deferred.reject(err);

			        if (user && bcrypt.compareSync(password, user.hash)) {
			            deferred.resolve(_.omit(user, 'hash'));
			        } else {
			            deferred.resolve();
			        }
			    })
			} else if(email){
				usersDb.findOne({email: email}, function (err, user) {
			        if (err) deferred.reject(err);

			        if (user && bcrypt.compareSync(password, user.hash)) {
			            deferred.resolve(_.omit(user, 'hash'));
			        } else {
			            deferred.resolve();
			        }
			    })
			}
			
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	}
}

module.exports = dataService;