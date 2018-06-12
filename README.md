# sequelize-reading-list
"My Reading List" is branded as a bookmarking app geared toward readers, but it theoretically could function as any type of "todo" or "wishlist" app. Users add items to a "Reading List," then can either move them to a "Recent Reads" list or delete them from the page.

## implementation
My Reading List essentially is a one page app built with `node` `express` and `express-handlebars`, which has routes to perform CRUD (create, read, update, delete) functions on a MySQL database. On the frontend, it minimally leverages `Foundation.css` (mainly, its grid and button classes).

See it hosted on Heroku, connected to a JAWs db, [here](https://agile-stream-68346.herokuapp.com/).

## accessing a list
You will be prompted to enter the name of a list and an email address. 

This resembles authentication, but really it just establishes an User record. The User id is a foreign key in the Items table, which is used to join the User (i.e. unique reading list) with entries in it.

If the name/address entered already exists in the User table, then the user will be redirected to their reading list. If the user/address does not exist, then the list will be created.

The user will end up at a url which looks like this:
https://agile-stream-68346.herokuapp.com/?username=books&email=tommy@tommy.com&id=1

See that list [here](https://agile-stream-68346.herokuapp.com/?username=books&email=tommy@tommy.com&id=1)

Again, this is not authentication. This is "association." Anyone can navigate to that list.

## data handling
On the login page, users must enter a list name and a valid email address. I use regex to validate the email address. If those criteria are not met, the input boxes flash red and provide feedback.

On the list page, users must enter a title, but they need not enter a description.

For both title and description fields, I try to check for urls, because urls (especially longs), will not be very pretty if rendered in full.

Before the values are rendered, I `split(' ')` the value of each field into an array, and then check whether `substring.(0,3) === 'www'` or `substring.(0,3) === 'http'`. If so, I format it into a url which ultimately renders like this `{link}`