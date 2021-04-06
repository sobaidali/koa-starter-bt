const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const path = require('path');

const app = new Koa();
const router = new KoaRouter();

//replace with DB
const things = ['My family', 'Programming', 'Music'];

//json prettier middleware
app.use(json());
//bodyparser middleware
app.use(bodyParser());

//simple middleware 
// app.use(async ctx => (ctx.body = 'Hello world!'));
// app.use(async ctx => (ctx.body = { msg: 'Hello word' }));
render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
})

//list of things
const index = async ctx => {
    await ctx.render('index', {
        title: 'Things I Love',
        things: things
    });
}
//show add page
const showAdd = async ctx => {
    await ctx.render('add');
}
//add post
const add = async ctx => {
    const body = ctx.request.body;
    things.push(body.thing);
    ctx.redirect('/');
}

//routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add)

router.get('/test', ctx => (ctx.body = 'Hello Test'));

//router middleware 
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server started.'));