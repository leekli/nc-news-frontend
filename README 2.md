# Northcoders News

Northcoders News is a social news aggregation, web content rating, and discussion website.

Northcoders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article.

This sprint should consolidate your understanding of making a [C.R.U.D](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) application from a front end perspective.

## Getting started

When you fork a repo from northcoders it will be private and as this project will need to be public the first thing to do is create a public repo for it.

### Create a public repo

1. **Do not** clone this repo. You will create a new repo to use later on. Instead navigate to the directory you normally keep your sprints in and use `create-react-app` to start a new React project locally on your machine. This will create a new react app with git already initialized.

```bash
$ npx create-react-app nc-news --use-npm
```

2. Create a public repo. From the GitHub homepage, click the "New repository" button.
3. Name your new repo with the same name as the React app you created earlier.
4. Make sure you **don't** create a new `README.md` or `.gitignore` as this will conflict with your own.
5. Add this repo as a `remote` to your local react project. The link is the same one you would use when cloning a repo.

```bash
$ cd nc-news
$ git remote add origin https://github.com/your-username/nc-news.git
```

*nb* If you make a mistake here you can change the url of an existing remote with:
```bash
$ git remote set-url origin https://github.com/your-username/nc-news.git
```

6. Push the initial React app. **Note** create-react-app will initialise the git repo on a branch called `master`. As we use `main` for the default branch you should first change to that branch before pushing

```bash
$ git checkout -b main
$ git push origin main
```

### Enable CORS on the Back End

When making requests to your api from a React app you will run into a Cross Origin Resource Sharing or [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) error. The next thing to do is enable these requests in our back end.

7. In your **back end** install the [CORS package](https://expressjs.com/en/resources/middleware/cors.html) from `npm`

```bash
$ npm install cors
```

8. In your `app.js` file, require in the package:

```js
const cors = require('cors');
```

9. In your `app.js` file, have your app use the `cors` middleware before any of your other middleware or routers.

```js
app.use(cors());
```

10. Once you have made these changes you will need to commit them and re-deploy your api. With heroku this can be done by pushing to your heroku remote.

```sh
$ git add package.json package-lock.json app.js
$ git commit -m 'allow cross origin resource sharing'
$ git push heroku main
```

## Objectives

1. Pull together all the front-end skills, technologies and best practices you have learnt.
2. Make asynchronous API calls to your own server.
3. Use HTTP request types to interact with your backend, and HTTP response codes to update your UI accordingly.

## What to do

Follow the [planning process](https://notes.northcoders.com/courses/js-front-end/planning-react-apps) for building a React app. You should create wire-frames for each route as well planning the component tree with associated state. Here are some project-specific things to bear in mind:

1. Have a look at your API endpoints. Think about what data you have available, and how you will structure your application. What routes will your application have? What articles will you choose to display on the main page?
2. Think how you will isolate the concerns of your project - the structure of your components, the sourcing of your data, the styling.
3. What sort of routing will your App use? What sort of specificity do you think you will need? Remember, your urls don't have to directly correspond to your api endpoints, but they will provide some guidance.
4. Think about what data each component will need. Where will it come from? When should components find their own data and when should they load it themselves? Focus on the simplest functionality first.
5. Consider more complex functionality: how do you want to allow changes to your database? Think about how you will attribute users to posted comments etc. How will you know what comments/articles a user should be allowed to delete? How about sorting data, or paginating responses? A good starting point would be to pick a single user and assuming that all new articles and comments are being posted by that user.
6. How are you going to make this a fluid and engaging experience for users, so they want to come back for more?

## User Stories

You should implement the following functionality in your website. Check the lecture calendar to see when any new topics will be covered, but feel free to have a go at them beforehand as well!

**Before moving onto the 'if time' and 'extra credit' sections of this readme, follow go to the Deployment section bellow, and then submit your code for review! Please send a link to both your GitHub project repository and your hosted website to your reviewer** 😀

**As a user, I should be able to...**

1. view a list of all articles
2. view a page for each topic with a list of related articles.
3. view an individual article.
4. view an individual article's comments.
5. vote on an article and immediately see the change.
6. post a new comment to an existing article (as a default logged in user. e.g. 'jessjelly').
7. sort articles by:
   - date created
   - comment_count
   - votes
8. delete my own comments (as a default logged in user. e.g. 'jessjelly').

**Error-handling: As a user, I should...**

9. see an appropriate error if I go on a non-existent path / a path for a non-existent article / topic.
10. not be allowed to post a comment if I have not filled in all of the form boxes.

**As a hiring partner, I should be able to...**

11. use the site on my mobile without sacrificing style or functionality (as I may not have my laptop nearby).
12. follow the readme instructions to easily run the project locally.
13. find a link to the hosted version of the project in the readme. (use a placeholder if not yet hosted!)
14. find a link to the back-end repository of the project in the readme.
15. find a link to the hosted version of the back-end project in the readme.

## _If time, and if you have implemented it in your back-end API..._

**As a user, I should be able to...**

16. vote on a comment and immediately see the change.
17. navigate over pages of articles (e.g. using pagination or infinite scroll).
18. navigate over pages of comments (e.g. using pagination or infinite scroll).
19. view a list of all articles written by any specific user.
20. post a new article to an existing topic.
21. delete my own articles.

## Deployment

There are many ways to deploy a React application. The `create-react-app` docs go into detail on some of the options: https://facebook.github.io/create-react-app/docs/deployment

We recommend Netlify. Check out the deployment notes for a step-by-step guide!

## Extra credit - what else do you think would be good for a user to be able to do, here are a couple of suggestions:

1. As a user, I should be able to see which users have been most active adding articles and comments
2. As a user, I should be able to sort the users by how popular they are based on an aggregation of their article and comment vote counts

## Important

This sprint is among the ones we'll ask you to complete in order to put you forward for jobs. Put a little bit of love into it! :) <3
