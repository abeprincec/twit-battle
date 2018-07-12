exports.up = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users')
		.dropTableIfExists('battle')
		.dropTableIfExists('character_battle')
		.then(createCharacterTable)
		.then(createBattleTable)
		// .then(createCharacterBattleTable)
		.then(createDummyData);

	function createCharacterTable() {
		return knex.schema.createTable('users', table => {
			table.increments('id').primary()
			table.string('name')
			table.integer('hp')
			table.integer('attack')
			table.integer('votes')
			table.boolean('eliminated')
			table.integer('matches')
			table.string('picture')
			table.string('description')
		})
	};

	function createBattleTable() {
		return knex.schema.createTable('battle', table => {
			table.increments('id').primary()
			table.integer('red_side_id_fk').references('id').inTable('users')
			table.integer('blue_side_id_fk').references('id').inTable('users')
			table.string('red_side_hp')
			table.string('blue_side_hp')
			table.boolean('active')
			table.decimal('timer')
		})
	};

	// function createCharacterBattleTable() {
	// 	return knex.schema.createTable('character_battle', table => {
	// 		table.increments('id').primary();
	// 		table.integer('battle_id').unsigned().references('id').inTable('battle');
	// 		table.integer('character_id').unsigned().references('id').inTable('users');
	// 		// table.increments('battle_id').primary()
	// 		// table.increments('character_id').primary()
	// 	})
	// };

	function createDummyData() {
		return Promise.all([knex('users').insert([{
				name: "DoDo",
				hp: 100,
				attack: 15,
				eliminated: false,
				matches: 2,
				description: "DoDo came from the BoBo kingdom, he seeks the Triforce",
				picture: "/images/images.jpg"
			}, {
				name: "Mark",
				hp: 100,
				attack: 5,
				eliminated: true,
				matches: 1,
				description: "I know a lot about random things. I’ve been called Wikipedia Jones.",
				picture:"/images/823552.jpg"
			}, {
				name: "Jeff",
				hp: 100,
				attack: 5,
				eliminated: false,
				matches: 1,
				description: "I went to Basic school, Pascal High School, did C as an undergrad, failed a VB master and after a couple of decades I have not given up on JS.",
				picture: "/images/juan.png"
			}]),
			knex('battle').insert([{
				red_side_id_fk: 1,
				blue_side_id_fk: 2,
				red_side_hp: 14,
				blue_side_hp: 0,
				active:false,
				timer:8.5
			},
			{
				red_side_id_fk: 1,
				blue_side_id_fk: 3,
				red_side_hp: 30,
				blue_side_hp: 0,
				active:false,
				timer:9.0
			}
			])
		])
	};
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('character_battle')
		.dropTableIfExists('battle')
		.dropTableIfExists('users')
};

// select users.* from users join battle ON (active=true) where battle.red_side_id=users.id or battle.blue_side_id=users.id;
// select users.* from users join battle ON (active=true AND (battle.red_side_id=users.id or battle.blue_side_id=users.id));
//do not delete