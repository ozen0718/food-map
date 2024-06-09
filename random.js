//런치리스트 배열생성
let lunchList = [
  "떡볶이",
  "우동",
  "햄버거",
  "냉면",
  "마라탕",
  "비빔국수",
  "라면",
  "잔치국수",
  "콩국수",
  "냉면",
  "제육볶음",
  "낙지 볶음",
  "불고기",
  "삼겹살",
  "한우",
  "김치찌개",
  "된장찌개",
  "부대찌개",
  "갈비탕",
  "순두부찌개",
  "짜장면",
  "짬뽕",
  "볶음면",
  "고추잡채",
  "탄탄면",
  "새우볶음밥",
  "마파두부",
  "탕수육",
  "라조기",
  "난자완스",
  "계란탕",
  "유산슬",
  "누룽지탕",
  "마라탕",
  "짬뽕",
];

//배열복사
let firstLunchList = [];

lunchList.forEach(function (item) {
  firstLunchList.push(item);
});

let costList = ["7000won", "5000won", "4500won", "8000won", "9000won"];

//제어할 요소선택 후 변수에 담기
let displaySlot = document.querySelector(".menu_slot"); //menu slot
let elem = document.querySelector(".menu_print > h2"); //menu print
let costTxt = document.querySelector("em"); //cost

//reset check
let resetNum = 1;

//LunchIs 함수선언
function lunchIs() {
  //setTimeout 선언
  setTimeout(timeFunc, 900);

  function timeFunc() {
    //shuffle 메소드 선언
    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    //슬롯애니메이션 감추기
    displaySlot.style.display = "none";

    //shuffle 메소드를 사용하여 석은 배열에서 index[0]을 가져오기
    console.log(shuffle(lunchList));
    let lunckPick = shuffle(lunchList)[0];

    //메뉴 노출
    console.log(lunckPick);
    elem.innerHTML = lunckPick;

    //선택된 메뉴의 indexOf를 이용하여 distanceTxt, costTxt 노출

    let i = firstLunchList.indexOf(lunckPick);
    costTxt.innerHTML = costList[i];

    //reset 되었을 경우에 숨겨진 메뉴를 다시 노출시킴
    if (resetNum == 0) {
      elem.style.display = "block";
    }
  }
}

//reset 함수선언
function reset() {
  //메뉴 숨기기
  elem.style.display = "none";

  //슬롯애니메이션 노출
  displaySlot.style.display = "block";

  // cost 초기화
  costTxt.innerHTML = "?000won";

  //resetNum으로 reset여부를 구분하기 위해 0 할당
  resetNum = 0;
}
