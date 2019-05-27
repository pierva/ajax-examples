
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
    console.log(src);
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

    return false;
};

$('#form-container').submit(loadData);

// loadData();
