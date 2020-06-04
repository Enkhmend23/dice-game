// Тоглоомын бүх газарт ашиглагдах глобал хувьсагчдыг энд зарлая
var activePlayer;
var scores;
var roundScore;

// Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч
var isGameOver;

// document.querySelector(".btn-roll").addEventListener("click", shooShid);
// function shooShid() {
//   // Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө
//   var diceNumber = Math.floor(Math.random() * 6) + 1;
//   alert("Шооны нүд: " + diceNumber);
// }

var diceDom = document.querySelector(".dice");

// Тоглоомыг эхлүүл
initGame();

// Шоог шидэх эвент листенер
// Anonymous буюу нэргүй функц ашиглав
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (isGameOver === false) {
    // Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө
    var diceNumber = Math.floor(Math.random() * 6) + 1;

    // Шооны зургийг вэб дээр гаргаж ирнэ.
    diceDom.style.display = "block";

    // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ.
    diceDom.src = "dice-" + diceNumber + ".png";

    // Буусан тоо нь 1-ээс ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
    if (diceNumber !== 1) {
      // 1-ээс ялгаатай тоо буулаа
      roundScore = roundScore + diceNumber;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна. NEW GAME товчийг дарж шинээр эхлэнэ үү");
  }
});

// HOLD товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (!isGameOver) {
    // Уг тоглогчийн цуглуулсан ээлжний оноог глобал оноон дээр нь нэмж өгнө
    scores[activePlayer] = scores[activePlayer] + roundScore;

    // Дэлгэц дээрх оноог өөрчлөх
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    // Уг тоглогч хожсон эсэхийг шалгах буюу оноо нь 100с их эсэх
    if (scores[activePlayer] >= 100) {
      // Тоглоомыг дууссан төлөвт оруулна
      isGameOver = true;

      // Ялагч гэсэн текстийг нэрний оронд гаргана
      document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      // Тоглогчийн ээлжийг сольно
      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна. NEW GAME товчийг дарж шинээр эхлэнэ үү");
  }
});

// Энэ функц нь тоглох ээлжийг дараачин тоглогч руу шилжүүлдэг.
function switchToNextPlayer() {
  // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө
  // Энэ тоглогчийн ээлжийг энэ хэсэгт сольж өгнө
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  //Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ
  // Хэрэв идэвхтэй тоглогч нь 0 байвал идвэхтэй тоглогчийг 1 болго
  // Үгүй бол идвэхтэй тоглогчийг 0 болго
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); //гурвалсан оператор

  // Улаан цэгийг шилжүүлэх код
  //document.querySelector(".player-0-panel").classList.remove("active");
  //document.querySelector(".player-1-panel").classList.add("active");
  document.querySelector(".player-0-panel").classList.toggle("active"); // toggle одоо байгаа төлөвийг нь нэмэх, эсвэл устгах эсэргээр нь нөлөөлнө
  document.querySelector(".player-1-panel").classList.toggle("active");

  // шоог үр алга болгох
  diceDom.style.display = "none";
}

// Шинэ тоглоом эхлүүлэх товчний эвэнт листенер
document.querySelector(".btn-new").addEventListener("click", function () {
  initGame();
});

function initGame() {
  // Тоглоом эхэллээ гэдэг төлөвт оруулна
  isGameOver = false;

  // Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэе
  activePlayer = 0;

  // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
  scores = [0, 0];

  // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
  roundScore = 0;

  // Програм эхлэхэд бэлтгэе
  document.getElementById("score-0").textContent = "0"; // энэ нь querySelector -оос илүү хурдан ажилладаг, тиймээс id гаар хайж байгаа үед getElementById гаар
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  diceDom.style.display = "none";

  // Тоглогчдын нэрийг буцааж гаргах
  document.getElementById("name-0").textContent = "Player1";
  document.getElementById("name-1").textContent = "Player2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
