# Intro to Ajax

Ajax allows clients (browsers) to request and load data asynchronously, in fact, AJAX stands for:
```
Asynchronous
JavaScript
And
XML
```
request.

Ajax requests allow for content retrieval and rendering without reloading the webpage.
The Asynchronous bit of the acronym means that the request doesn't block other events from happening.
The page keeps doing its thing and reacts on the data only when the requested content is received.

Certain requests may require some sort of authentication, for example, by requiring an API key or O-off.

The `X` in AJAX stands for XML which used to be the dominant hierarchical data format. Nowadays, JSON is much more popular than XML. Embedded within Ajax responses, is very common to see HTML to fill in some part of the page.

## Get Started
To use this simple application you need to create your own API credentials for Google Street View and New York Times.

Once you got your credentials create a `js` file in the root folder of your project called `keys.js`. The file will have the following content:
```js
var gStreetViewKey = 'your-api-key';
var nytKey = 'your-api-key';
```
