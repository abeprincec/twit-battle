var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
const getBearerToken = require('get-twitter-bearer-token');

const twitter_consumer_key = 'TwLpS2IZT9mzyCpd31C6f2Ykk';
const twitter_consumer_secret =
	'nxs5IONxiEdp6CBQEvL48KRju1CMAgQaB6rCbqUyTtyJAvWa4U';
let twitter_bearer_token =
	'AAAAAAAAAAAAAAAAAAAAAHCS6wAAAAAAUrdisbS22LUsBJCl%2BzV%2B2qaEse0%3DFHxzYB2mSY487EtCGN0Il3PdxfdmiLL9M0UCDcVKjUKxCPTbhZ';

getBearerToken(twitter_consumer_key, twitter_consumer_secret, (err, res) => {
	if (err) {
		// handle error
	} else {
		// bearer token
		console.log(res.body.access_token);
		twitter_bearer_token = res.body.access_token;
	}
});

module.exports = function(knex) {
	// router.get('/message', function(req, res, next) {
	//   res.json('Welcome To React rjfoirf');

	// });
	// let insertuser = {
	//   name: req.body.name,
	//   email: req.body.email
	// };

	var client = new Twitter({
		consumer_key: 'TwLpS2IZT9mzyCpd31C6f2Ykk',
		consumer_secret: 'nxs5IONxiEdp6CBQEvL48KRju1CMAgQaB6rCbqUyTtyJAvWa4U',
		bearer_token: twitter_bearer_token,
	});

	// var params = { screen_name: 'nodejs' };

	router.get('/message', (req, res) => {
		// client.get('users/show', params, function(error, tweets, response) {
		// 	if (error) {
		// 		console.log(error);
		// 	}
		// 	if (!error) {
		// 		console.log(tweets);
		// 	}
		// });
		knex
			.select('*')
			.from('users')
			.then(results => {
				console.log(results);
				res.json(results);
			});
	});
	router.get('/character', (req, res) => {
		knex
			.select('*')
			.from('users')
			.then(results => {
				console.log(results);
				res.json(results);
			});
	});
	router.get('/character/:id', (req, res) => {
		//let user_id = req.session.;
		knex
			.select('id')
			.from('users')
			.then(results => {
				console.log(results);
				res.json(results);
			});
	});
	router.get('/CurBattle', (req, res) => {
//		 select users.* from users join battle ON (active=true AND (battle.red_side_id=users.id or battle.blue_side_id=users.id));
//
		knex
		.select('battle.id AS BATTLEID','red_side_id_fk','blue_side_id_fk','users.id','users.name','users.hp','users.attack')
		.from('users')
		.join('battle',function() {
 		 this.on('battle.red_side_id_fk','=','users.id').orOn('battle.blue_side_id_fk','=','users.id')
 		})
 		.where('active','=',true)
 		.orderBy('BATTLEID')
			.then(results => {
				console.log(results);
				res.json(results);
//				res.json(results.rows);
			});
	});
	router.get('/CurBattle/:id', (req, res) => {
		console.log(req.params,"what is parmasID?????");
		knex
			.select('id')
			.from('battle')
			.then(results => {
				console.log(results);
				res.json(results);
			});
	});

	router.post('/NewChar', (req, res) => {
		console.log(req.body.select, 'O or T');
		if (req.body.select === 'T') {
			let param = { screen_name: req.body.character };
			client.get('users/show', param, function(error, tweets, response) {
				if (error) {
					console.log(error);
					// if(typeof(tweets.statuses_count)===undefined){
					// 	}
				}
				if (!error) {
					console.log(tweets.followers_count, 'what is the followers count?');
					console.log(tweets.statuses_count, 'what is the tweet count?');
					knex('users')
						.insert({
							name: req.body.character,
							hp: tweets.statuses_count,
							attack: tweets.followers_count,
						})
						.then(results => {
							console.log(results);
							return res.json(results);
						});
				}
			});
		} else {
			knex('users')
				.insert({
					name: req.body.character,
					hp: 100,
					attack: 5,
				})
				.then(results => {
					console.log(results);
					return res.json(results);
				});
		}
		// 		let health=tweets.statuses_count;
		// let attack=tweets.followers_count;
		// knex('users')
		// 	.insert({
		// 		name: req.body.character,
		// 		hp: health,
		// 		att: attack,
		// 	})
		// 	.then(results => {
		// 		console.log(results);
		// 		return res.json(results);
		// 	});

		// return res.status(200).json(polls);
	});

	router.post('/CurBattle', (req, res) => {
		knex('battle')
			.insert([
				{
					red_side_id_fk: req.body.teamRed,
					blue_side_id_fk: req.body.teamBlue,
					active: true
				},
			])
			.then(results => {
				console.log(results);
				res.json(results);
			});
	});
	return router;
};
