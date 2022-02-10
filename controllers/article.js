// import database connection
const con = require('../utils/db');

// show all articles - index page app.get('/',
const getAllArticles = (req, res) => {
	let query = "SELECT * FROM article";
	let articles = []
	con.query(query, (err, result) => {
	if (err) throw err;
	articles = result
	res.render('index', {
		articles: articles
	})
})
};

//show article by this slug app.get('/article/:slug',
 const getArticleBySlug = (req, res) => {
	let query = `SELECT *,article.name as article_name, author.name as author_name FROM article INNER JOIN author ON author.id = article.author_id WHERE slug="${req.params.slug}"`
	let article
	con.query(query, (err, result) => {
		if (err) throw err;
		article = result
		res.render('article', {
			article: article
		})
	});
};

// show articles by author app.get('/author/:id',
 const getArticlesByAuthor = (req, res) => {
	// query for the name and articles
	let authorQuery = `SELECT name as author_name FROM author WHERE id = ${req.params.id}`
	let author
	let articlesQuery = `SELECT * FROM article WHERE author_id = ${req.params.id}`
	let articles
	// does the query
	con.query(articlesQuery, (err, result) => {
		if (err) throw err;
		articles = result
	})
	con.query(authorQuery, (err, result) => {
		if (err) throw err;
		author = result
		// render author and articles tags.
		res.render('author', {
			author: author,
			articles: articles
		})
	})
};

// export controller functions
module.exports = {
	getAllArticles,
	getArticleBySlug,
	getArticlesByAuthor
};