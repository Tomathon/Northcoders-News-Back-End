## Northcoders News API

### About

A RESTful API for Northcoders News, a Reddit-style social news, web content rating and discussion website. Built with Node.js(8.4.0), Express(4.14.0), MongoDB(3.4.7) and Mongoose(4.7.0).

### Installation

Please ensure you have the following dependencies running on your local machine before cloning this repo:

To check you have [Node.js](https://nodejs.org/en/download/) installed, open a terminal window and type:
```
node -v
```

To check you have [MongoDB](https://www.mongodb.com/download-center?jmp=tutorials#community) installed, open a terminal window and type:
```
mongo --version
```

To check you have [Git](https://git-scm.com) installed, open a terminal window and type:
```
git --version
```

Clone this repository and in the command line on your local machine and type the following:
```
git clone https://github.com/Tomathon/BE-FT-northcoders-news.git
```
Navigate into the cloned local repository and install all dependencies from the package.json file by typing the following:
```
npm install
```
In a new terminal widow, connect to the database and type:
```
mongod
```
To seed the database with data, type the following in a new terminal window:
```
node seed/seed.js
```
The server can now be run on your local machine on port 3000. To do this type:
```
npm start
```

### Testing

To test the API endpoints on your local machine enter the following command in your terminal window:
```
npm test
```

### API Routes
```
GET /api/topics
```
Get all the topics

```
GET /api/topics/:topic_id/articles
```
Return all the articles for a certain topic

```
GET /api/articles
```
Returns all the articles

```
GET /api/articles/:article_id/comments
```
Get all the comments for a individual article

```
POST /api/articles/:article_id/comments
```
Add a new comment to an article. This route requires a JSON body with a comment key and value pair
e.g: {"comment": "This is my new comment"}

```
PUT /api/articles/:article_id
```
Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
e.g: /api/articles/:article_id?vote=up

```
PUT /api/comments/:comment_id
```
Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
e.g: /api/comments/:comment_id?vote=down

```
DELETE /api/comments/:comment_id
```
Deletes a comment

```
GET /api/users/:username
```
Returns a JSON object with the profile data for the specified user.
