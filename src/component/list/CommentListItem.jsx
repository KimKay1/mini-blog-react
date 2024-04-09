import { useState } from "react";
import styled from "styled-components";
import Modal from "../ui/Modal";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;

    :hover {
        background: lightgrey;
    }
`;

const ContentText = styled.p`
    font-size: 20px;
    white-space: pre-wrap;
`;

function CommentListItem(props) {
    const { comment, setUpdateReply } = props;
    const rIdx = comment.ridx;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editComment, setEditComment] = useState(props.comment.content);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const editReply = () => {
        axios.post(`/reply/write`, {
            ridx: rIdx,
            content: editComment
            // idx: postId // join된 값을 찾아서 처리하기 위해 적어줘야함 -- spring에서 처리함...
        })
            .then(response => {
                handleModalClose();
                setUpdateReply(uuidv4()); // 글 올리고 나서 새로고침
            })
            .catch(error => console.error(error));
        // console.log(props); // props에 idx값은 없고 ridx값은 있음... ridx값으로 idx값 찾아서 수정해야할듯
    }

    const eventReplyDelete = () => {
        if (window.confirm("삭제하시겠습니까?")) {
            axios.post(`/reply/delete/${rIdx}`)
                .then(response => {
                    alert("삭제 완료");
                    setUpdateReply(uuidv4());
                })
                .catch(error => console.error(error));
        }
    }

    return (
        <>
            <Wrapper onClick={handleModalOpen}> {/* 클릭 시 모달 열기 */}
                <ContentText>{comment.content}</ContentText>
            </Wrapper>
            {isModalOpen && <Modal comment={comment} onClose={handleModalClose} editReply={editReply} editComment={editComment} setEditComment={setEditComment} eventReplyDelete={eventReplyDelete} />} {/* 모달이 열려있으면 모달 컴포넌트 렌더링 */}
        </>
    );
}

export default CommentListItem;