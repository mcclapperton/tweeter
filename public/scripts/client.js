/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { response } = require("express");

$(document).ready(function () {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  // loop through tweets
  // calls createTweetElement for ea
  // appends return val to tweets container
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
  };

  // takes in a tweet object and returns a tweet <article> element
  const createTweetElement = function (tweet) {
    const $tweet = $(`
    <article class="tweet">
      <header>
        <div>
          <p class="name"><img src="${tweet.user.avatars}"> ${tweet.user.name}</p>
        </div>
        <div class="handle">
        <span>${tweet.user.handle}</span>
        </div>
      </header>
        <p class ="content">${tweet.content.text}</p>
      <footer>
        <p>${tweet.created_at}<p>
        <div class="icons">
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-flag"></i>
          </div>
      </footer>
    </article>`);
    return $tweet;
  };
  renderTweets(data);

  // event listener
  $(".new-tweet form").submit(function (event) {
    // prevent def event (page reload?)
    event.preventDefault();
    // turns form data --> query string
    const serialized = $(event.target).serialize();
    // post req. sends serialized data to server
    $.ajax("/tweets", { method: "POST", data: serialized });
  });
});
