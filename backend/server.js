let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./db/db');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        console.log('Connexion réussie')
    },
    error => {
        console.log('Echec de connexion: ' + error)
    }
)

const marsupilamiRoute = require('../backend/routes/Marsupilami.route');
const authRoute = require('../backend/routes/Auth.route');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
// app.use(express.static(path.join(__dirname, 'dist/appartoo')));
// app.use('/', express.static(path.join(__dirname, 'dist/appartoo')));
app.use('/api', marsupilamiRoute);
app.use('/auth', authRoute);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connecté au port ' + port)
})

app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});