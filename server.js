let express = require('express');
let parser = require('body-parser');
let app = express();

app.use('/', express.static('public'));
app.use('/signup', express.static('public'));
app.use('/signin', express.static('public'));
app.use('/scoreboard', express.static('public'));
app.use('/about', express.static('public'));
app.use('/game', express.static('public'));
app.use('/game/singleplayer', express.static('public'));
app.use('/game/multiplayer', express.static('public'));

app.use(parser.json());

app.listen(process.env.PORT || 3000, () => {
  console.log(`App started on port ${process.env.PORT || 3000}`);
});
