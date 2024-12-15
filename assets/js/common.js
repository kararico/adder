$(document).ready(function () {
    // 공통 함수: 랜덤 숫자 생성 및 값 설정
    function setRandomNumbers(min, max) {
        let randomLeft = Math.floor(Math.random() * (max - min + 1)) + min;
        let randomRight = Math.floor(Math.random() * (max - min + 1)) + min;

        // 항상 큰 값을 왼쪽에, 작은 값을 오른쪽에 할당
        if (randomLeft < randomRight) {
            [randomLeft, randomRight] = [randomRight, randomLeft];
        }

        $('.left-number_box').text(randomLeft);
        $('.right-number_box').text(randomRight);
    }

    // 숫자 버튼 클릭 이벤트
    $('.type_lsit button').on('click', function () {
        const index = $(this).index();
        if (index === 0) setRandomNumbers(1, 9); // 1자리 숫자
        if (index === 1) setRandomNumbers(10, 99); // 2자리 숫자
    });

    // 연산 버튼 클릭 이벤트
    let currentResult = 0; // 연산 결과 저장
    $('.btn-list button').on('click', function () {
        const operation = $(this).text(); // 연산 기호
        const leftNumber = parseInt($('.left-number_box').text());
        const rightNumber = parseInt($('.right-number_box').text());

        switch (operation) {
            case '+':
                currentResult = leftNumber + rightNumber;
                break;
            case '-':
                currentResult = leftNumber - rightNumber;
                break;
            case 'x':
                currentResult = leftNumber * rightNumber;
                break;
        }

        $('.sign_box').text(operation);
    });

    // 공통 함수: 팝업 표시
    function showPopup(message, isCorrect) {
        $(".popup_layer").css("display", "flex");
        $(".popup_layer").find(".result-title").text(message);

        if (isCorrect !== undefined) {
            $(".img_list").css("display", "block");
            $(".img_list").find("li").eq(isCorrect ? 1 : 0).addClass("active");
        }
    }

    // 확인 버튼 클릭 이벤트
    $('.result_wrap button').on('click', function () {
        const userInput = $('.result_value').val().trim(); // 사용자 입력 값
        const operation = $('.sign_box').text().trim(); // 연산 기호

        if (operation === '') {
            showPopup("기호를 선택해 주세요.");
            return;
        }

        if (userInput === '') {
            showPopup("값을 입력해주세요.");
            return;
        }

        const isCorrect = parseInt(userInput) === currentResult;
        showPopup(isCorrect ? "정답입니다." : "오답입니다.", isCorrect);

        if (isCorrect) {
            // 정답일 경우 초기화
            $('.result_value').val("");
            $('.left-number_box, .right-number_box, .sign_box').text("");
        }
    });

    // 팝업 닫기 이벤트
    $(".btn_close").on("click", function () {
        $(".img_list").css("display", "none").find("li").removeClass("active");
        $(".popup_layer").css("display", "none");
        $(".result-title").text("");
    });
});