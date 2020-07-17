# Web Scraping
Scraping Articles and Comics from theOatmeal by Matthew Inman.  
Save blog posts that you want to get around to reading later. 
Delete Blog posts you no longer want to save. 

## Dependancies
    <npm i axios>
    <npm i cheerio>
    <npm i express>
    <npm i express-handlebars>
    <npm i mongoose>
---

## Deployment on Github
https://jmh947.github.io/web_scraping/

## Deployment on Heroku
https://web-scrape47.herokuapp.com/
---

## GIF
![App Gif](web_scrape.gif)

## Routes

| Route | Description |
| ----------- | ----------- |
| /scrape | Will gather new articles to be saved |
| /savedArticles | Displays all articles you have saved |
| /delete/:id | Deletes the article from your saved list |
