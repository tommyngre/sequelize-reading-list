# sequelize-reading-list
"My Reading List" is branded as a bookmarking app geared toward readers, but it theoretically could function as any type of "todo" or "wishlist" app. Users add items to a "Reading List," then can either move them to a "Recent Reads" list or delete them from the page.

## implementation
My Reading List essentially is a one page app built with `node` `express` and `express-handlebards`, which has routes to perform CRUD (create, read, update, delete) functions on a MySQL database. On the frontend, it minimally leverages `Foundation.css` (mainly, its grid and button classes).

See it hosted on Heroku, connected to a JAWs db, [here](https://blooming-beyond-98044.herokuapp.com/).

## data handling
In general, My Reading List is supers responsive (h/t Foundation). Because of certain data possibilities, it does some nifty handling. For example, if a user enters a url (potentially a super long one), here's what happens.

First, if a user tries to a null entry or an entry > 255, then the user is notified that data doesn't post.

If data does post, here's what happens when on `GET`
* Each row returned from the database has an `item_name` property
* If the `item_name` property begins with 'htt' or 'www' then it's flagged as a URL and formatted as a link
* If `item_name` is greater than 25 characters (whether a URL or not), a truncated `displayName` property is defined. This is done because long strings (without spaces) like URLS are (1) unattractive and (2) could cause trouble with responsiveness wrapping.