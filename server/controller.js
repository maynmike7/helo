const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req, res) => {
        const {username, password} = req.body, 
              db = req.app.get('db')

        const foundUser = await db.users.check_users({username})
        if(foundUser[0]){
            return res.status('Username already in use')
        }

        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt);

        const newUser = await db.users.register_users({username, password: hash})
        req.session.user = newUser[0]
        res.status(201).send(req.session.user)
    },
    login: async(req, res) => {
        let {username, password} = req.body,
            db = req.app.get('db')
        
        const foundUser = await db.users.check_users({username})
        if(!foundUser[0]){
            return res.status(400).send('username not found')
        }

        const authenticated = bcrypt.compareSync(password, foundUser[0].password)
        if(!authenticated){
            return res.status(401).send('password is incorrect')
        }

        delete foundUser[0].password
        req.session.user = foundUser[0]
        res.status(202).send(req.session.user)
    },
    getPosts: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');
    
        db.post.get_posts(id)
        .then(posts => res.status(200).send(posts))
        .catch(err => res.status(500).send(err));
    }
}

