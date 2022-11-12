// doc loaded and ready
{
  $(document).ready(function () {
    $(`#tweet-text`).on("input", onInput);
  });
  // counts the characters as theyre input (from 140)
  const onInput = function () {
    const charRemains = 140 - $(this).val().length;
    const $counter = $(this).siblings("div").children(".counter");
    $counter.html(charRemains);

    // counter turns red after 140
    charRemains < 0
      ? $counter.addClass("invalid")
      : $counter.removeClass("invalid");
  };
}
