import { useState } from "react";
import styled from "styled-components";
import Modal from "../ui/Modal";
import axios from "axios";
import {v4 as uuidv4} from "uuid";

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
    const { comment } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const editReply = () => {
        // axios.post(`/reply/write`, {
        //     content: comment,
        //     idx: postId // join된 값을 찾아서 처리하기 위해 적어줘야함
        // })
        //     .then(response => {
        //         setUpdateReply(uuidv4()); // 글 올리고 나서 새로 고침하려고 이렇게 해둔건데... 이걸 안 쓰는 방법이 있을까?
        //         setComment("");
        //     })
        //     .catch(error => console.error(error));
        console.log(props); // props에 idx값은 없고 ridx값은 있음... ridx값으로 idx값 찾아서 수정해야할듯
    }

    return (
        <>
            <Wrapper onClick={handleModalOpen}> {/* 클릭 시 모달 열기 */}
                <ContentText>{comment.content}</ContentText>
            </Wrapper>
            {isModalOpen && <Modal comment={comment} onClose={handleModalClose} editReply={editReply} />} {/* 모달이 열려있으면 모달 컴포넌트 렌더링 */}
        </>
    );
}

export default CommentListItem;