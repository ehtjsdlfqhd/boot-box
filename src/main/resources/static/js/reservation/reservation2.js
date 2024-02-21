// let seats = document.querySelector(".all-seats");
// console.log("reservation2 분리 - 좌석 60개 배치");
// for (var i = 0; i < 59; i++) {
//     let randint = Math.floor(Math.random() * 2);
//     let booked = randint === 1 ? "booked" : "";
//     seats.insertAdjacentHTML(
//         "beforeend",
//         '<input type="checkbox" name="tickets" id="s' +
//         (i + 2) +
//         '" /><label for="s' +
//         (i + 2) +
//         '" class="seat ' +
//         booked +
//         '"></label>'
//     );
// }
//
// let tickets = seats.querySelectorAll("input");
// tickets.forEach((ticket) => {
//     ticket.addEventListener("change", () => {
//         let amount = document.querySelector(".amount").innerHTML;
//         let count = document.querySelector(".count").innerHTML;
//         amount = Number(amount);
//         count = Number(count);
//
//         if (ticket.checked) {
//             count += 1;
//             amount += 200;
//         } else {
//             count -= 1;
//             amount -= 200;
//         }
//         document.querySelector(".amount").innerHTML = amount;
//         document.querySelector(".count").innerHTML = count;
//     });
// });
//=====================================================

//th 영화 제목 클릭시 하단 div에 해당 영화 포스터 이름, 포스터 동적으로 출력
//예매 페이지 첫 진입시 info-seats none 처리
const infoMoviesNone = document.querySelector(".info-movies");
const infoSeatsNone = document.querySelector(".info-seats");
infoSeatsNone.style.display='none';
var cinemaDiv = container.querySelector('.seat-container2-2cinema');
var dateDiv = container.querySelector('.seat-container2-2date');
var theaterDiv = container.querySelector('.seat-container2-2theater');
var peopleDiv = container.querySelector('.seat-container2-2people');
//
var selectSeatDiv = container.querySelector(".seat-container3-2");
var totalPayDiv = container.querySelector(".seat-container3-4");
//
//0219
let reservatoinPage=1; //기본 1부터 시작.


//영화 선택 시..0219
var movieId;
$(document).ready(function()
{
    $(".select-movie").click(function()
    {
        console.log("영화 선택1");
        // 모든 행의 선택을 취소하고 선택된 행에만 'selected' 클래스를 추가
        $(this).css('background', 'linear-gradient(to right, black, black)');
        // 다른 버튼의 배경색을 원래대로 되돌리기 위해 모든 버튼에 대해 반복
        $(".select-movie").not(this).css('background', '');

        //선택한 영화의 고유 id (pk)값 가져오기.
        // 선택된 버튼의 ID(영화관 ID) 출력
        movieId = $(this).data("movie-id");
        console.log("선택된 영화 고유 ID:", movieId);
        
    });
});
function showPoster(posterUrl,movieTitle) {
    console.log("출력할 포스터:"+posterUrl);
    console.log("출력할 영화명:"+movieTitle);
    // 외부의 <div> 요소를 찾습니다.
    const posterContainer = document.querySelector(".seat-container1");//getElementById("posterContainer");

    // 해당 포스터 이미지를 표시하는 <img> 요소를 생성합니다.
    let imgElement = document.querySelector(".seat-container1-img");

    let textElement = document.querySelector(".seat-container1-title");
    // 이전에 표시된 이미지가 있다면 제거합니다.
    posterContainer.innerHTML = "";
    imgElement.src = posterUrl;
    //movieTitle을 전체 출력하되, 제목이 길면 자른다.

    if(movieTitle.length>=10)
    {
        textElement.innerHTML = addLineBreaks(movieTitle,10);
    }
    else
    {
        textElement.innerHTML = movieTitle;
    }

    posterContainer.appendChild(imgElement);
    posterContainer.appendChild(textElement);
}


//지역 선택시 .. 2
$(document).ready(function(){
    $(".select_location").click(function()
    {
        //수정한 거
        console.log("지역선택");

        $(this).css('background', 'linear-gradient(to right, black, black)');
        // 다른 버튼의 배경색을 원래대로 되돌리기 위해 모든 버튼에 대해 반복
        $(".select_location").not(this).css('background', '');
        console.log("지역선택2");
        var localName = $(this).text();
        console.log("선택된 지역:", localName);

        // 선택된 버튼의 ID(영화관 ID) 출력
        var localId = $(this).data("local-id");
        console.log("선택된 지역 ID:", localId);
    });
});




var cinemaId;
$(document).ready(function(){
    $(".select_location2").click(function()
    {
        //수정한 거
        $(this).css('background', 'linear-gradient(to right, black, black)');
        // 다른 버튼의 배경색을 원래대로 되돌리기 위해 모든 버튼에 대해 반복
        $(".select_location2").not(this).css('background', '');
        console.log("지점선택2");
        var cinemaName = $(this).text();
        console.log("선택된 영화관:", cinemaName);

        cinemaDiv.innerText = cinemaName;



        // 선택된 버튼의 ID(영화관 ID) 출력
        cinemaId = $(this).data("cinema-id");
        console.log("선택된 영화관 ID:", cinemaId);
    });
});


//0220 임시 - 날짜를 선택해야 비동기로 상영 스케줄을 가져오도록 함.
$(document).ready(function(){
    $(".select_date").click(function()
    {
        //수정한 거
        console.log("날짜 선택");
        $(this).css('background', 'linear-gradient(to right, black 0%, black 100%)');
        // 다른 버튼의 배경색을 원래대로 되돌리기 위해 모든 버튼에 대해 반복
        $(".select_date").not(this).css('background', '');

        dateDiv.innerText = $(this).text();

        // 선택된 버튼의 ID(영화관 ID) 출력
        let dateId = $(this).data("date-id");
        console.log("선택된 date ID:",dateId);

        //현재 선택된 극장,상영관,날짜 한 번 더 체크하기.
        console.log("현재 선택한 영화,상영관,날짜");
        console.log(movieId,cinemaId,dateId);

        /*
        * test1.날짜선택시 스케쥴 출력
        *
        *
        * */

        $.ajax({
            url: `${contextPath}reservation/findSchedules`,
            type: 'get',
            data:{
                movieId, //영화
                cinemaId, //샹영관
                dateId //날짜
            },
            success(organizedSchedules){

                makeNewSchedule(organizedSchedules);

            },
            //requests:  요청 객체입니다. 보통 HTTP 요청 정보를 포함하며, 요청한 클라이언트의 정보와 요청된 리소스에 대한 정보 등을 포함합니다.
            // status: HTTP 상태 코드입니다. 실패한 요청의 상태 코드를 나타냅니다.
            // error: 서버에서 반환된 오류 메시지입니다.
            error(request, status, error) {
                //console.error('~~~~Ajax request failed~~~~:', error);
                console.log('~~~~Error response responseText~~~~:', request.responseText);
                console.log('~~~~Error response status~~~~:', request.status);
                if(request.status==500)
                {
                    alert(`에러로 인해 메인페이지로 이동합니다. 이용에 불편을 끼쳐드려 죄송합니다.`)
                    window.location.href = `${contextPath}bootbox/`; // 리다이렉트할 URL을 지정합니다.
                }
                else if(request.status==401) //인증 관련 에러 잠시 주석처리..
                {
                    alert(`예매는 로그인 후 이용하실 수 있습니다.`)
                    window.location.href = `${contextPath}`+request.responseText; // 리다이렉트할 URL을 지정합니다.
                }

            }
        });

    });
});

//0221 영화-극장-원하는날짜로 새 상영스케쥴을 받아온 후 가공하는 함수
function makeNewSchedule(organizedSchedules)
{
    const scheduleTable = document.getElementById('scheduleTable');
    // 기존의 행 삭제
    while (scheduleTable.rows.length > 1) {
        scheduleTable.deleteRow(1); // 헤더를 제외한 행을 삭제합니다.
    }

    // 새로운 데이터 추가
    const [{ totalDuration, schedules, title }] = organizedSchedules;
    console.log("총 상영 시간:", totalDuration);
    console.log("제목:", title);

    const tbody = scheduleTable.querySelector('.tbody_schedule');
    tbody.innerHTML = ''; // tbody 내용을 비움


    // 선택된 행 추적을 위한 변수
    let selectedRow = null;

    schedules.forEach(({ times, theater }) => {
        times.forEach(({ schId, time, seatsAvailable }) => {
            const row = scheduleTable.insertRow();
            const schIdCell = row.insertCell();
            const timeCell = row.insertCell();
            const theaterCell = row.insertCell();
            const seatsAvailableCell = row.insertCell();
            //상영일정id도 추가
            schIdCell.textContent = schId;
            timeCell.textContent = time;
            theaterCell.textContent = theater;
            seatsAvailableCell.textContent = seatsAvailable + '석';

            // 행에 클릭 이벤트 리스너 추가
            row.addEventListener('click', () => {
                // 이전에 선택된 행이 존재한다면 배경색을 원래대로 되돌리기
                if (selectedRow) {
                    selectedRow.style.backgroundColor = ''; // 이전에 선택된 행의 배경색을 지움
                }
                // 선택된 행을 현재 클릭한 행으로 설정하고 배경색을 검은색으로 변경
                selectedRow = row;
                selectedRow.style.backgroundColor = 'black';
                // 클릭된 행에 대한 동작을 여기에 추가
                console.log('클릭된 행:', schId,time, theater, seatsAvailable);
                selectedSheduleId = schId;
                theaterDiv.innerHTML=theater;
            });
        });
    });

    // 새로운 tbody를 추가
    scheduleTable.appendChild(tbody);

    schedules.forEach(({ times, theater }) => {
        console.log("극장:", theater);
        times.forEach(({ bookingUrl, time, seatsAvailable }) => {
            console.log("시간:", time);
            console.log("예약 링크:", bookingUrl);
            console.log("남은 좌석:", seatsAvailable);
        });
    });
}

//10글자씩 잘라서 br 처리 (장문의 영화 타이틀 처리)
function addLineBreaks(str, charsPerLine) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += str[i];
        if ((i + 1) % charsPerLine === 0) {
            result += '<br>';
        }
    }
    return result;
}

// URL에서 쿼리 파라미터를 가져오는 함수입니다.
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        movieId: params.get('movieId'),
        cinemaId: params.get('cinemaId'),
        schId: params.get('schId'),
        schDate: params.get('schDate')
    };
}

// 페이지 로드 시 선택된 영화, 극장, 스케줄을 설정하는 함수입니다.
function setSelectedOptions() {
    const { movieId, cinemaId, schId , schDate} = getQueryParams();

    if (movieId && cinemaId && schId) {
        // 영화 선택
        const movieOption = document.querySelector(`.select-movie[data-movie-id="${movieId}"]`);
        if (movieOption) {
            movieOption.click();
        }

        // 극장 선택
        const cinemaOption = document.querySelector(`.select_location2[data-cinema-id="${cinemaId}"]`);
        if (cinemaOption) {
            cinemaOption.click();
        }

        // 스케줄 선택
        const scheduleOption = document.querySelector(`.select_date[data-date-id="${schDate}"]`);
        if (scheduleOption) {
            scheduleOption.click();
        }
    } else {
        console.error('파라미터를 읽을 수 없습니다.');
    }
}

// 페이지가 로드될 때 자동으로 선택하는 로직을 실행합니다.
document.addEventListener('DOMContentLoaded', setSelectedOptions);


//======================================================================================
document.querySelector(".select-seats-prev-button").addEventListener('click',function ()
{
    //alert('이전버튼');
    console.log("...이전 버튼...");
    var cookieValue = getCookie("myCookie");
    $('#test-area').html("");

    if (cookieValue !== null) {
        // 쿠키에서 가져온 JSON 형식의 문자열을 배열로 변환
        var myArray = JSON.parse(cookieValue);

        // 배열 값을 사용하여 필요한 작업 수행
        console.log(myArray); // 배열 값 콘솔 출력
    } else {
        console.log("쿠키를 찾을 수 없습니다.");
    }

    if (infoMoviesNone.style.display === 'none') {
        infoMoviesNone.style.display = 'block'; //보이고
        infoMoviesNone.style.display = 'flex'; //flex속성
        infoSeatsNone.style.display='none';
    } else {
        // div.style.display = 'none';
    }
});

//결제
document.querySelector(".btn_pay").addEventListener('click', function ()
{
    alert("결제");
});
let selectedSheduleId;

//0219 다음 버튼을 눌렀을 때, 영화-극장-시간-상영시간 모두 선택되어야 한다. 한개라도 선택 안되어있다면 넘어가지 못함.
document.querySelector(".select-seats-next-button").addEventListener('click',function ()
{
    console.log("...다음 버튼 클릭...");
    //0219 영화,극장,날짜,상영시간표를 모두 선택하지 않으면 다음으로 넘어갈 수 없음.
    // if(!checkButtonAllSelect()) {
    //     alert('모든 버튼을 누르셔야 다음으로 이동하실 수 있습니다.');
    //     return;
    // }


    //비동기 test
    $.ajax({
        url: `${contextPath}reservation/detailSchedule`,
        type: 'get',
        data:{
            scheduleId:selectedSheduleId
        },
        success(response){
            console.log("success : 선택한 상영일정의 예약된 좌석 값 가져오기",response);
            makeSeat(response);

        },
        //requests:  요청 객체입니다. 보통 HTTP 요청 정보를 포함하며, 요청한 클라이언트의 정보와 요청된 리소스에 대한 정보 등을 포함합니다.
        // status: HTTP 상태 코드입니다. 실패한 요청의 상태 코드를 나타냅니다.
        // error: 서버에서 반환된 오류 메시지입니다.
        error(request, status, error) {
            //console.error('~~~~Ajax request failed~~~~:', error);
            console.log('~~~~Error response responseText~~~~:', request.responseText);
            console.log('~~~~Error response status~~~~:', request.status);
            if(request.status==500)
            {
                alert(`에러로 인해 메인페이지로 이동합니다. 이용에 불편을 끼쳐드려 죄송합니다.`)
                window.location.href = `${contextPath}bootbox/`; // 리다이렉트할 URL을 지정합니다.
            }
            else if(request.status==401) //인증 관련 에러 잠시 주석처리..
            {
                alert(`예매는 로그인 후 이용하실 수 있습니다.`)
                window.location.href = `${contextPath}`+request.responseText; // 리다이렉트할 URL을 지정합니다.
            }

        }
    });
});

//0219 다음 버튼 외에 영화,극장,시간 버튼 눌렀을 때에도 비동기로 쿼리를 전송하는 작업을 실행해야함..ㅎ..=>상영스케줄을 알기 위해서..
//하나라도 false면 다음으로 넘어갈 수 없음.
function  checkButtonAllSelect()
{

}


function makeSeat(response)
{
    console.log("ajax에서 함수 불러오기.");
    ////[SeatDto(id=23, name=C03), SeatDto(id=30, name=C10)]
    // const [SeatDto] = response;
    // console.log("testttttttttttttttttttttttttt", SeatDto);


    //이미 예약된 자리 배열
    const disabledSeat = [];
    response.forEach((SeatDto)=>
    {
        console.log("testttttttttttttttttttttttttt", SeatDto);
        const {id,name}=SeatDto;

        console.log("id:", id);
        console.log("name:", name);
        disabledSeat.push(name);
    });

    reservatoinPage=2;
    let testArray = ['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff'];
    setCookieForList("myCookie", testArray, 1); //1일
    if (infoSeatsNone.style.display === 'none') {
        infoSeatsNone.style.display = 'block';
        infoSeatsNone.style.display = 'flex';

        infoMoviesNone.style.display='none';
    } else {
        // div.style.display = 'none';
    }

    // 6행 10열의 좌석 생성
    createSeats(6, 10,disabledSeat);

}

//============================================================================================================================
// 알파벳 배열(좌석행)
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];
let checkbox;
function createSeats(rows, cols,disabledSeat) {
    console.log("createSeats :)");

    const seatTableBody = document.getElementById('seatTableBody');
// seatTableBody에 있는 모든 자식 요소를 제거
    while (seatTableBody.firstChild) {
        seatTableBody.removeChild(seatTableBody.firstChild);
    }
    // 행 반복
    for (var i = 0; i < rows; i++) {
        var row = document.createElement('tr');

        // 알파벳 표시하는 첫 번째 셀 생성
        var col = document.createElement('td');
        var label = document.createElement('label');
        var label_row = document.createElement('label_row');
        label.className = 'seat';
        label_row.textContent = alphabet[i]; // 알파벳 표시
        col.appendChild(label);
        col.appendChild(label_row);
        row.appendChild(col);

        // 좌석 생성하는 나머지 셀 생성
        for (var j = 1; j <= cols; j++)
        {
            // 좌석 번호 계산
            //var seatId = i * cols + j;

            //좌석 번호에서 알파벳+번호로 처리 a1 b5 이런식으로.
            //0216 한자리 수 인 경우 앞에 0 추가 1->01
            let seatId =alphabet[i] +  (j < 10 ? '0' + j : j);
            // 좌석 생성
            checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 's' + seatId;
            checkbox.name = 'tickets';
            checkbox.className = 'custom-checkbox'; // 사용자 정의 체크박스 클래스 추가

            checkbox.setAttribute('data-seat-id', seatId); // 좌석 아이디를 데이터 속성으로 추가

            checkbox.addEventListener('click', function()
            {
                console.log('Clicked seat ID:', this.getAttribute('data-seat-id'));
                //클릭시 관람인원이 0명인 경우 인원을 먼저 선택하라고 알려준다.
                if(numberOfPeople==0)
                {
                    alert('관람인원을 선택해주세요.(현재 0명)');
                    this.checked = false;
                }
                else
                {
                    checkedCount = 0;
                    // 페이지 내의 모든 체크박스를 반복하여 상태 확인
                    var checkboxes = document.querySelectorAll('input[type="checkbox"][name="tickets"]');

                    checkboxes.forEach(function(checkbox)
                    {
                        if (checkbox.checked) {
                            checkedCount++;

                        }

                    });
                    console.log("현재 체크된 체크박스:",checkedCount);
                    if(numberOfPeople<checkedCount)
                    {
                        alert("관람인원 이상 좌석을 선택하실 수 없습니다.");
                        this.checked = false;
                    }
                    //모든 체크박스들을 순회하여
                    var checkedIds = []; // 체크된 체크박스의 아이디를 저장할 배열
                    checkboxes.forEach(function(checkbox) {
                        if (checkbox.checked) {

                            checkedIds.push(checkbox.id.replace('s','')); // 체크된 체크박스의 아이디를 배열에 추가
                        }
                    });
                    // 체크된 체크박스의 아이디를 출력
                    selectSeatDiv.innerText = checkedIds;
                    console.log("체크된 체크박스의 아이디: ", checkedIds);

                    totalPayDiv.innerText = "10000 * "+ checkedCount +" = "+10000* checkedCount +"원";
                    if(checkedIds.length==0) {
                        totalPayDiv.innerText = "-";
                        selectSeatDiv.innerText = "-";
                    }
                }
            });

            var label = document.createElement('label');
            label.htmlFor = 's' + seatId;
            label.className = 'seat';
            label.textContent = j; // 열 번호 추가

            disabledSeat.forEach(function(seat) {
                if(seat===seatId)
                    checkbox.disabled = true;
            });

            // 테이블에 추가
            var col = document.createElement('td');
            col.appendChild(checkbox);
            col.appendChild(label);
            row.appendChild(col);
        }
        seatTableBody.appendChild(row);
    }
}

//예약된 좌석 현황을 체크해주는 함수



function toClear()
{
    var checkboxes = document.querySelectorAll('input[type="checkbox"][name="tickets"]');
    // 각 체크박스의 checked 속성을 false로 설정하여 초기화
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false; //모든 체크박스 false
    });
    numberOfPeople = 0; //지정한 인원수도 초기화
    peopleDiv.innerText = numberOfPeople +"명";
    resultElement.innerText = numberOfPeople;
    selectSeatDiv.innerText = "-";
    totalPayDiv.innerText = "-";
}

document.getElementById('btn-clear').addEventListener('click', function() {
    // 페이지 내의 모든 체크박스를 선택
    toClear();
});
// 결과를 표시할 element
const resultElement = document.getElementById('peopleResult');

// 현재 화면에 표시된 인원수 값
let numberOfPeople = resultElement.innerText;
function count(type)  {

    // 더하기/빼기 numberOfPeople = 선택한 인원
    if(type === 'plus' && numberOfPeople<8 )
    {
        numberOfPeople = parseInt(numberOfPeople) + 1;
    }else if(type === 'minus' && numberOfPeople>0)
    {
        console.log("체크된 좌석 갯수:",checkedCount);
        numberOfPeople = parseInt(numberOfPeople) - 1;
        if(numberOfPeople<checkedCount)
        {
            console.log("numberOfPeople..............:",numberOfPeople);
            let yes = confirm('설정한 인원보다 더 많은 좌석을 선택하실 수 없습니다. 초기화 하시겠습니까?');
            if(yes)
            {
                console.log("예 누름");
                toClear();
            }
            else
            {
                console.log("아니오 누름");
                numberOfPeople = parseInt(numberOfPeople) + 1;
            }
        }
    }
    // 결과 출력
    resultElement.innerText = numberOfPeople;
    peopleDiv.innerText = numberOfPeople +"명";
}

//================================================================

//체크된 체크박수 갯수 확인하는 메소드
var checkedCount = 0;
// 페이지 내의 모든 체크박스를 반복하여 상태 확인



function highlightCell(cell)
{
    // 클릭된 td의 클래스에 "highlighted" 클래스가 있는지 확인
    console.log(cell.classList);
    var isHighlighted = cell.classList.contains("highlighted");

    // 클래스가 있으면 제거하고, 없으면 추가하여 배경색 변경(on,off)
    if (isHighlighted) {
        cell.classList.remove("highlighted");
    } else {
        cell.classList.add("highlighted");
    }
}



//0216 내가 선택한 값 저장할 용도로 쓰일 쿠키 test
//쿠키설정
function setCookieForList(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); //기간 1일
        expires = "; expires=" + date.toUTCString();
    }
    // 배열을 JSON 문자열로 변환하여 저장
    var jsonValue = JSON.stringify(value);
    document.cookie = name + "=" + (jsonValue || "") + expires + "; path=/";
}

//쿠키가져오기.
function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

//0216 로그인한 회원만 보이는 선호극장을 클릭시 실행하는 이벤트
function select_member_like_cinema()
{
    alert('선호극장 클릭!');
    //선호극장이 등록되어있든 안되어있든 이 부분을 누르면 지점쪽은 초기화가 되어있어야 함.

}



// 결제 연결
// document.querySelector(".btn_pay").addEventListener('click', function ()
// {
//     // alert("결제");
// });
IMP.init("imp32105587"); // 가맹점코드 - 고정값
function requestPay() {
    IMP.request_pay({
        pg: "html5_inicis", // PG사코드 - 고정값
        pay_method: "card", // 결제방식 - 고정값
        merchant_uid: "order" + new Date().getTime(), // UTC , 결제 API 주문번호 고유값
        name: "영화 결제", // 고정값
        amount: 100, // 결제 금액
        buyer_tel: "01086759708", // 회원연락처
    },function (rsp) {
        if (rsp.success) {
            // 결제 성공 시: 결제 승인 성공한 경우
            // jQuery로 HTTP 요청
            // $.ajax({
            //     url: contextPath,
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     data: {
            //         imp_uid: rsp.imp_uid,            // 결제 고유번호
            //         merchant_uid: rsp.merchant_uid   // 주문번호
            //     }
            // }).done(function (data) {
            // 가맹점 서버 결제 API 성공시 로직
            // console.log(imp_uid);
            // console.log(merchant_uid);
            alert("결제에 성공하였습니다.");
            // })
        } else {
            // 결제 실패시
            // $.ajax({
            //     url: contextPath,
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     data: {
            //         imp_uid: rsp.imp_uid,            // 결제 고유번호
            //         merchant_uid: rsp.merchant_uid   // 주문번호
            //     }
            // }).done(function (data) {
            //     // 가맹점 서버 결제 API 실패 로직
            //     console.log(imp_uid);
            //     console.log(merchant_uid);
            alert("결제에 실패하였습니다. 다시 시도해주세요.");
            // })
        }
    });
}

