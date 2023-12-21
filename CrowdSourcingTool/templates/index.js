function askAnotherQuestion() {
  var ans = $("#answer").val();
  if (ans == "") {
    alert("من فضلك اكتب شيئا, أو اضغط skip.");
    return;
  }
  $.post("/submit", { answer: ans }, function (response) {
    // Handle the response if needed

    // Update the question if there is a new question
    if (response.new_question) {
      $("#question p").text(response.new_question);
    }
  });
  $("#answer").val("");
}

function skip() {
  $.get("/skip", function (response) {
    // Update the question if there is a new question
    if (response.new_question) {
      $("#question p").text(response.new_question);
    }
  });
}

function CustomAlert() {
  this.alert = function (message, title) {
    document.body.innerHTML =
      document.body.innerHTML +
      '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

    let dialogoverlay = document.getElementById("dialogoverlay");
    let dialogbox = document.getElementById("dialogbox");
    let dialogboxhead = document.getElementById("dialogboxhead");

    let winH = window.innerHeight;
    dialogoverlay.style.height = winH + "px";

    dialogbox.style.top = "100px";

    dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";

    document.getElementById("dialogboxhead").style.display = "block";

    if (typeof title === "undefined") {
      document.getElementById("dialogboxhead").style.display = "none";
    } else {
      document.getElementById("dialogboxhead").innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + title;
    }
    document.getElementById("dialogboxbody").innerHTML = message;
    document.getElementById("dialogboxfoot").innerHTML =
      '<button class="pure-material-button-contained active" onclick="customAlert.ok()">OK</button>';
    dialogbox.style.dir = "rtl";
    dialogbox.style.textAlign = "right";
    dialogboxhead.style.textAlign = "center";
  };

  this.ok = function () {
    document.getElementById("dialogbox").style.display = "none";
    document.getElementById("dialogoverlay").style.display = "none";
  };
}

instructions = "\
- أجب عن الأسئلة التالية باللغة العربية.\n<br>\
- جميع الأسئلة التالية تخص كليات حاسبات ومعلومات بالجامعات المصرية.\n<br>\
- أكتب جملة علي الأقل.\n<br>\
- إذا لم تستطع الإجابة علي أي من الأسئلة، تخطي السؤال.\n<br>\
- يمكنك الاستعانة ببحث سريع علي الانترنت.\n<br>\
- كن جادًا في الإجابة علي الأسئلة، لا تضع إجابات هزلية.";

console.log(instructions)
header = "التعليمات"

let customAlert = new CustomAlert();

window.onload = function () {
  customAlert.alert(instructions, header);
};