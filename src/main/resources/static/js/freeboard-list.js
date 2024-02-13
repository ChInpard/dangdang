import Modal from '/js/modal-board.js'

window.addEventListener("load", function() {
	
	let postForm = document.querySelector(".post-detail")
	let dotBtn = postForm.querySelector(".post-nav-icon")
	
	if (dotBtn) {
		dotBtn.onclick = function(e) {
			e.preventDefault()

			let modal = new Modal({
				title: "게시물 수정",
				content: "수정 하시겠습니까?"
			})
			modal.show()
			return
		}

		const updateBtn = () => {
			const id = '${m.id}'
			location.href = "/member/board/modify?id" + id;
		}

		const deleteBtn = () => {
			const id = '${m.id}'
			location.href = "/member/board/delete?id" + id;
		}

	}

})
