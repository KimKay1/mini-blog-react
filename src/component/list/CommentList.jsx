import styled from "styled-components";
import CommentListItem from "./CommentListItem";
import { v4 as uuidv4 } from "uuid";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

function CommentList(props) {
    const { comments } = props;

    // 댓글이 없는 경우를 처리하기 위해 조건문 추가
    if (!comments || comments.length === 0) {
        return null; // 댓글이 없는 경우, 빈 화면을 반환하거나 아무것도 반환하지 않음
    }

    return (
        <Wrapper>
            {comments.map((comment) => {
                return (
                    <CommentListItem key={uuidv4()} comment={comment} /> // 기존의 key={comment.id}는 값이 없어서 uuid로 변경함
                );
            })}
        </Wrapper>
    );
}

export default CommentList;