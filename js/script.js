
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var street = $('#street').val();
    var city = $('#city').val();
    var location = street + ', ' + city;
    $greeting.text('So, you want to live at ' + location + '?');
    var src = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&' +
              'location=' + location +
              '&key=' + gStreetViewKey + '';
    $body.append('<img class="bgimg" src="' + src +'">');

    var nytURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?' +
                 'q='+ city + '&sort=newest&api-key=' + nytKey;
    $.getJSON(nytURL, function (data) {
      $nytHeaderElem.text('New York Times Articles about ' + city);

      $.each(data.response.docs, function (index, val) {
        var $link = $('<a>').attr('href', val.web_url)
        $link.text(val.headline.main);
        var $paragraph = $('<p>').text(val.snippet);
        var $li = $('<li>').addClass('article');
        $nytElem.append($li.append($link).append($paragraph));
      });
    })
    .fail(function() {
      $nytHeaderElem.text('New York Times Articles could not be loaded');
    });

    // Wikipedia articles
    var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+
                  city + "&format=json&callback=wikiCallback";

    // Error handling using jsonp. Since there isn't a built in error handling
    // when using jsonp, we can create a timeout that fires when we submit
    // the search. If everything goes well, we'll clear the timeout before
    // it changes the displayed text. If the callback function fails, the
    // timeout will run its function and the text will change to the one
    // specified in the timeout function.
    var wikiRequestTimeout = setTimeout(function() {
      $wikiElem.text('Failed to load wikipedia resources.')
    }, 5000);

    $.ajax({
      url: wikiURL,
      dataType: 'jsonp',
      // if the callback in the API url was named differently than 'callback',
      // you would specify the name in the below parameter. In this case the
      // callback is called 'callback' (look at the url => callback=wikiCallback),
      // therefore we don't need to specify the jsonp callback function name
      //jsonp: "callback"
      success: function(response){
        $.each(response[1], function(index, article){
          var url = 'https://en.wikipedia.org/wiki/' + article;
          $wikiElem.append('<li><a href="' + url + '">' + article + '</a></li>');
        });
        console.log(response);
        clearTimeout(wikiRequestTimeout);
      }
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
