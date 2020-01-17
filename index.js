const db = require ('./data/seeds/users.js');

const express = require('express');

const server = express();
server.use(express.json());

server.listen(4000, () => {
    console.log('=== server listening on port 4000 ===');
});

server.use(express.json());

server.get('/', (req, res) => {
    response.send('hello ...');
});


//-------------------------------------------------//
//When the client makes a POST request to /api/users//
//-------------------------------------------------//

server.post('/users', (req, res) => {
    const userInfo = req.body;

    db.add(userInfo)
    .then ((user) => {
        res.status(201).json ({ success: true, user});
        if (name && bio) {
            res.status(201).json ({ success: true, user});
        } else {
            res.status(400).json ({ success: false, errorMessage: 'Please provide name and bio for the user'});
        }
    })
    .catch ((err) => {
        res.status(500).json ({ success: false, errorMessage: 'There was an error while saving the user to the database'})
    });
});


//-------------------------------------------------//
//When the client makes a GET request to /api/users:
//-------------------------------------------------//

server.get('/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json ({ success: false, errorMessage: "The users information could not be retrieved."});
    });
});

//-------------------------------------------------//
//When the client makes a GET request to /api/users/:id://
//-------------------------------------------------//

server.get('/users/:id', (req, res) => {
    db.findById(req.params.id)
    .then(user => {
        if (user) {
            res.status(200).json ({ success: true, user });
        } else {
            res.status(404).json ({ success: false, message: "The user with the specified ID does not exist."});
        }
    })
    .catch (err => {
        res.status(500).json ({ success:false, errorMessage: "The user information could not be retrieved." });
    });
});


//-------------------------------------------------//
//When the client makes a DELETE request to /api/users/:id://
//-------------------------------------------------//

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    console.log ('ok');

    db.remove(id)
    .then (deletedUser => {
        if (deletedUser) {
            res.status(204).end();
        }else{
            res.status(404).json ({ message: "The user with the specified ID does not exist."});
        }       
    })
    .catch (err => {
        res.status(500).json ({ success: false, errorMessage: "The user could not be removed" });
    });
});

//-------------------------------------------------//
//When the client makes a PUT request to /api/users/:id://
//-------------------------------------------------//

server.put ('/users/:id', (req, res) => {
    const id = req.params.id;
    const userInfo = req.body;

    db.udpate(id, userInfo)
    .then (user => {
        if (user) {
            res.status(200).json ({ success: true, user});
        } else {
            res.status(404).json ({ success: false, message: "The user with the specified ID does not exist."});
        }

        if (name && bio) {
            res.status(201).json ({ success: true, user});
        } else {
            res.status(400).json ({ success: false, errorMessage: 'Please provide name and bio for the user'});
        }
    })
    .catch (err => {
        res.status (500).json({ success: false, errorMessage: "The user information could not be modified." });
    });
});

//-------------------------------------------------//
//-------------------------------------------------//


