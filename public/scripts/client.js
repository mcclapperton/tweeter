$(document).ready(function () {
  // Preventing XSS with Escaping
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // loop through tweets
  // calls createTweetElement for ea
  // appends return val to tweets container
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  // uses jquery to make req. to /tweets and receive arr of tweets as JSON
  const loadTweets = function () {
    $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
      renderTweets(tweets);
    });
  };

  // hides error if no error
  $(".errorMsg").slideUp().text("");

  // takes in a tweet object and returns a tweet <article> element
  const createTweetElement = function (tweet) {
    const $tweet = $(`
    <article class="tweet">
      <header>
        <div>
          <p class="name"><img src="${escape(tweet.user.avatars)}"> ${escape(
      tweet.user.name
    )}</p>
        </div>
        <div class="handle">
        <span>${escape(tweet.user.handle)}</span>
        </div>
      </header>
        <p class ="content">${escape(tweet.content.text)}</p>
      <footer>
        <p>${escape($.timeago(tweet.created_at))}<p>
        <div class="icons">
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-flag"></i>
          </div>
      </footer>
    </article>`);
    return $tweet;
  };

  // load tweets
  loadTweets();

  // event listener
  $(".new-tweet form").submit(function (event) {
    // prevent def event (page reload?)
    event.preventDefault();
    // turns form data --> query string
    const serialized = $(event.target).serialize();

    // error handling, if over 140 char
    const $tweetCharLength = $(`textarea`).val().length;
    if ($tweetCharLength > 140) {
      return $(".errorMsg")
        .text("!! Tweet too long! Please shorten to 140 characters. !!")
        .slideDown();
    }
    // error handling, if empty
    if (!$tweetCharLength) {
      return $(".errorMsg")
        .text(`!! Tweet is empty! Please add content. !!`)
        .slideDown();
    }
    // slides up again if no error
    $(".errorMsg").slideUp().text("");
    // post req. sends serialized data to server
    $.ajax("/tweets", { method: "POST", data: serialized }).then(() => {
      // calls loadtweets
      loadTweets();
      // textarea and counter reset after submit
      $("textarea").val("");
      $("output");
    });
  });
});
