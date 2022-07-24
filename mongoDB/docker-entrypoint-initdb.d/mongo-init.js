db = db.getSiblingDB('main_db');
db.createUser(
    {
        user: 'user',
        pwd:  'password',
        roles: [{role: 'readWrite', db: 'main_db'}],
    }
);