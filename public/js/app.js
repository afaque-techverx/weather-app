// console.log("Client goes brrhhhh");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message_1");
const messageTwo = document.querySelector("#message_2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageTwo.textContent = "Loading...";

  fetch(`/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log();
          messageTwo.textContent = data.error;
        } else {
          messageTwo.textContent = "";
          messageOne.textContent =
            "Its " +
            data.weather +
            "y in " +
            location +
            ".Temperature outside is " +
            data.temperature +
            " degree celsius observed at " +
            data.observation_time +
            " ";
        }
      });
    }
  );
});
