const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
const mysql = require('mysql');
const { Op } = require("sequelize");
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const { Sequelize, Model, DataTypes, where } = require('sequelize');
// const sequelize = new Sequelize('vacations_ltd', 'root', 'Amiramir16', {
//     host: 'localhost',
//     dialect: 'mysql'
// });
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
async function fn() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

fn()


const Users = sequelize.define('users', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

const Vacations = sequelize.define('vacations', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pics: {
        type: DataTypes.STRING,
        allowNull: false
    },
    from_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    till_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

const Followers = sequelize.define('followers', {
    user_id: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    vacation_id: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
}, {
    timestamps: false
});

Users.hasMany(Followers, { foreignKey: "user_id" });
Followers.belongsTo(Users, { foreignKey: "user_id" });

Vacations.hasMany(Followers, { foreignKey: "vacation_id" });
Followers.belongsTo(Vacations, { foreignKey: "vacation_id" });

app.post('/search', async (req, res) => {
    const data = req.body
    const userId = data.user.id
    const desti = data.searchVac[0].destination.toLowerCase().toUpperCase()
    const fromDate = data.searchVac[0].from
    const tilldate = data.searchVac[0].till
    const filter = {}
    if (fromDate) {
        filter['from_date'] = fromDate
    }
    if (tilldate) {
        filter['till_date'] = tilldate
    }
    try {
        const followedId = []
        const followed = await Followers.findAll({
            where: { user_id: userId },
            include: {
                model: Vacations,
                where: {
                    [Op.and]:
                        [
                            {
                                destination: { [Op.like]: `%${desti}%` }
                            },
                            filter
                        ]

                }, include: Followers
            }
        })
        followed.forEach((item) => {
            item.dataValues.vacation.isFollowed = true
            followedId.push(item.vacation_id)
        })
        const notFollowed = await Vacations.findAll({
            where: {
                [Op.and]:
                    [
                        {
                            destination: { [Op.like]: `%${desti}%` }
                        },
                        filter
                    ],
                id: { [Op.notIn]: followedId }
            },
            include: Followers
        })
        const vacations = [...followed, ...notFollowed]
        res.json(vacations)
    }
    catch (err) {
        res.send({ message: "Error 404" });
    }
}
)

app.delete('/delete-vacation/:id', async (req, res) => {
    const data = req.body
    Followers.destroy({
        where: {
            vacation_id: data.id
        }
    })
    Vacations.destroy({
        where: {
            id: data.id
        }
    })
    res.json(data)
})

app.post('/addfollow', async (req, res) => {
    const data = req.body
    try{
        const user = await Users.findOne({ where: { id: data.userId } })
        const [vacation, created] = await Followers.findOrCreate({
            where: { vacation_id: data.vacationId, user_id: user.id },
            defaults: {
                vacation_id: data.vacationId,
                user_id: user.id
            }
        });
        if (!created) {
            await vacation.destroy()
            const followed = await Followers.findAll({
                where: { vacation_id: data.vacationId },
            })
            res.json({ status: false, followed: followed })
        }
        else {
            const followedd = await Followers.findAll({
                where: { vacation_id: data.vacationId },
            })
            res.json({ status: true, followed: followedd })
        }
    }
    catch (err) {
        res.json({ message: 'err' })
    }
})

app.post('/addvacation', async (req, res) => {
    try {
        const data = req.body
        const jane = await Vacations.create({
            description: data.description,
            destination: data.destination,
            pics: data.image,
            from_date: data.fromDate,
            till_date: data.tillDate,
            price: data.price
        });
        console.log(jane.toJSON());
        res.json(data)
    }
    catch (err) {
        res.send(404).send({ message: "Error 404" });
    }
})

app.patch('/updatevacation', async (req, res) => {
    try {
        const data = req.body
        const vacation = await Vacations.findOne({
            where: { id: data.id }
        })
        vacation.update(
            {
                description: data.description,
                destination: data.destination,
                pics: data.image,
                from_date: data.fromDate,
                till_date: data.tillDate,
                price: data.price
            }
        )
        res.json(data)
    }
    catch (err) {
        res.json({ message: 'err' })
    }
})

app.get('/findvacation/:id', async (req, res) => {
    const data = req.params
    try {
        const vacation = await Vacations.findOne(
            {
                where: { id: data.id }
            }
        )
        res.json(vacation)
    }
    catch (err) {
        res.send(404).send({ message: "Error 404" });
    }
})

app.get('/adminvacations', async (req, res) => {
    try {
        const vacation = await Vacations.findAll({
            include: [
                { model: Followers, include: { model: Users } },
            ],
        })
        res.json(vacation)
    }
    catch (err) {
        res.send(404).send({ message: "Error 404" });
    }
})

app.get('/allvacations/:id', async (req, res) => {
    const data = req.params.id
    try {
        const followedId = []
        const followed = await Followers.findAll({
            where: { user_id: data },
            include: { model: Vacations, include: Followers }
        })
        followed.forEach((item) => {
            item.dataValues.vacation.isFollowed = true
            followedId.push(item.vacation_id)
        })
        const notFollowed = await Vacations.findAll({
            where: {
                id: { [Op.notIn]: followedId }
            },
            include: Followers
        })
        const vacationss = [...followed, ...notFollowed]
        res.json(vacationss)
    }
    catch (err) {
        res.send(404).send({ message: "Error 404" });
    }
})

app.post("/login", async (req, res) => {
    const newUser = req.body
    try {
        const user = await Users.findOne({
            where: { username: newUser.userName, password: newUser.password }
        });
        if (user === null) {
            console.log('Not found!');
            res.status(201).send({ message: "Wrong username or password", success: false })
        }
        else if (newUser.userName === 'adminadmin' && newUser.password === 'admin1234') {
            res.status(201).send({ admin: true })
        }
        else {
            res.status(201).send({ message: "Welcome to vacation ltd " + user.username, success: true, id: user.id })
        }
    }
    catch (err) {
        res.send(404).send({ message: "Error 404" });
    }
});

app.post("/signup", async (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    try {
        const [user, created] = await Users.findOrCreate({
            where: { username: newUser.userName },
            defaults: {
                first_name: newUser.firstName,
                last_name: newUser.lastName,
                password: newUser.password
            },
        });

        if (!created) {
            return res.status(203).send({ message: "Username already taken", status: false });
        }

        res.status(201).send({ newUser: newUser, message: "Account created", status: true });
    } catch (err) {
        res.status(404).send({ message: "Invalid information", validation: false });
    }
});


app.listen(process.env.PORT || 4000, () => {
    console.log("the server is listening on port 4000")
})

