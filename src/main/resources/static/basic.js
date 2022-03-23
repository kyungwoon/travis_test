
$(document).ready(function () {
    getBoards();


    //글쓰기 버튼 누르면 모달로 글쓰기 창이 나타남
    $("#write-btn").click(function () {
        $("#write-title").val("");
        $("#write-name").val("");
        $("#write-content").val("");
        $("#modal-name").text("글쓰기");
        $("#modify-post-btn").hide();
        $("#save-post-btn").show();
        $("#write-modal").addClass("is-active");
    });


    //글 저장(게시물 올리기)
    $("#save-post-btn").click(function () {
        writePost();
    });

    //엑스 누르면 글쓰기 모달창 꺼짐
    $("#close-write-modal").click(function () {
        $("#write-modal").removeClass("is-active");
    });

    //배경 누르면 글쓰기 모달창 꺼짐
    $("#write-modal-background").click(function () {
        $("#write-modal").removeClass("is-active");
    });

    //엑스 누르면 상세보기 모달창 꺼짐
    $("#close-detail-modal").click(function () {
        $("#detail-modal").removeClass("is-active");
    });

    //배경 누르면 상세보기 모달창 꺼짐
    $("#detail-modal-background").click(function () {
        $("#detail-modal").removeClass("is-active");
    });

    //상세보기 모달) 글 수정 버튼 누르기기
    $("#modify-btn").click(function () {
        $("#detail-modal").removeClass("is-active");
        getModifyData();
        $("#save-post-btn").hide();
        $("#write-name").attr("disabled", true);
        $("#modal-name").text("글수정");
        $("#modify-post-btn").show();
        $("#write-modal").addClass("is-active");
    });

    //수정 완료
    $("#modify-post-btn").click(function () {
        modifyPost();
    });

    $("#detail-delet").click(function () {
        deleteOne();
    });

});


//게시물 데이터 모두 가져와 목록 만들기
function getBoards() {

    $.ajax({
        type: "GET",
        url: '/api/boards',
        success: function (response) {
            let result = response["content"];  //게시물 데이터
            if (result.length > 0) {
                $("#table-tbody").empty();
                for (let i = 0; i < result.length; i++) {
                    let id = result[i]["id"];
                    let title = result[i]["title"];
                    let name = result[i]["name"];
                    let modified_at_date = result[i]["modifiedAt"];
                    let temp_html =
                        `
                         <tr>
                            <th id="${id}">${id}</th>
                            <td id="${id}-title" onclick="showDetail('${id}')"><a href = "#">${title}</a></td>
                            <td id="${id}-name" onclick="showDetail('${id}')">${name}</td>
                            <td id="${id}-modifieddate" onclick="showDetail('${id}')">${modified_at_date}</td>
                        </tr>`
                    $("#table-tbody").append(temp_html);
                }
            } else {
                $("#table-tbody").empty();
                let temp_html = `<tr><td id="table-empty" colspan="5">작성한 글이 없습니다.</td></tr>`;
                $("#table-tbody").append(temp_html);
            }
        }
    });
}


//클릭한 게시물의 상세내용 보여주기
function showDetail(id) {
    let get_id = id;

    $.ajax({
        type: "GET",
        url: "/api/boards/" + get_id,
        success: function (response) {
            console.log(response);
            let id = response["id"];
            let title = response["title"];
            let name = response["name"];
            let modified_at_date = response["modifiedAt"];
            let content = response["content"];

            $("#detail-title").text(title);
            $("#detail-name").text(name);
            $("#detail-createdate").text(modified_at_date);
            $("#detail-content").text(content);
            $("#detail-id").val(id);
            $("#detail-content").css("white-space", "pre");
            $("#detail-modal").addClass("is-active");


        },
    });
}


//글 작성
function writePost() {
    let title = $("#write-title").val().trim();
    let name = $("#write-name").val().trim();
    let content = $("#write-content").val().trim();

    if (title == "") {
        alert("제목을 입력하세요");
        $("#write-title").focus();
        return;
    }
    if (name == "") {
        alert("작성자 이름을 입력하세요");
        $("#write-name").focus();
        return;
    }
    if (content == "") {
        alert("내용을 입력하세요");
        $("#write-content").focus();
        return;
    }
    let data = {title: title, name: name, content: content};
    $.ajax({
        type: "POST",
        url: "/api/boards",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert("작성 완료!");
            window.location.reload();
        }
    });
}

// 삭제
function deleteOne() {
    let get_id = $("#detail-id").val();
    if (confirm("삭제 하시겠습니까?")) {
        $.ajax({
            type: "DELETE",
            url: "/api/boards/" + get_id,
            success: function (response) {
                alert('메시지 삭제에 성공하였습니다.');
                window.location.reload();
            }
        })
    }
}


//글 수정 모달창에 값 불러오기
function getModifyData() {
    let title = $("#detail-title").text();
    let name = $("#detail-name").text();
    let content = $("#detail-content").text();
    let id = $("#detail-id").val();

    $("#write-title").val(title);
    $("#write-name").val(name);
    $("#write-content").val(content);
    $("#write-id").val(id);
}


//글 수정 완료하기
function modifyPost() {
    let get_id = $("#write-id").val();
    let title = $("#write-title").val();
    let name = $("#write-name").val();
    let content = $("#write-content").val();

    let data = {title: title, name: name, content: content}
    $.ajax({
        type: "PUT",
        url: "/api/boards/" + get_id,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert("수정되었습니다");
            window.location.reload();
        }
    });
}