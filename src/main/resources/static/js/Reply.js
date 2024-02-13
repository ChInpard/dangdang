document.addEventListener('DOMContentLoaded', () => {
    const regIcon = document.querySelector('.reg-icon'); 
    if (regIcon) {
        regIcon.addEventListener('click', submitComment); 
    } else {
        console.error('등록 아이콘을 찾을 수 없습니다!');
    }
});

async function submitComment() {
    console.log("버튼클릭");
    const commentContentElement = document.getElementById('comment_content');
    const boardIdElement = document.getElementById('board_id');
    const sessionIdElement = document.querySelector('#sessionId'); 



    if (!commentContentElement.value.trim()) {
        alert('댓글 내용을 입력해주세요.');
        return;
    }
    
    const commentContent = commentContentElement.value;
    const boardId = boardIdElement.value;
    const sessionId = sessionIdElement.value; 

    console.log(sessionId);
    console.log(boardId);

    console.log('Sending fetch request.');
		let response = await fetch ('/api/replies', {
		method: "POST",
		headers:{
			'content-type': 'application/json'
		},
		body: JSON.stringify({"content":commentContent,
								"memberId":sessionId,
								"boardId":boardId})
		
	})
	
    if (response.ok) {
        console.log("댓글 등록 성공");
        window.location.replace(location.href);
    } else {
        console.error('댓글 등록 실패:', response.statusText);
        alert('댓글 등록에 실패했습니다.');
    }
}

function addCommentToDOM(comment) {
    // 댓글 목록을 나타내는 요소를 선택합니다.
    const commentList = document.querySelector('.comment-list'); // .comment-list는 댓글 목록을 담고 있는 요소의 클래스명입니다.

    // 새로운 댓글 요소를 생성합니다.
    const newComment = document.createElement('div');
    newComment.classList.add('comment'); // .comment는 각 댓글 요소에 적용할 클래스명입니다.
    newComment.innerHTML = `
        <strong>${comment.memberId}</strong>
        <p>${comment.content}</p>
    `;

    // 댓글 목록에 새 댓글 요소를 추가합니다.
    commentList.appendChild(newComment);
}
