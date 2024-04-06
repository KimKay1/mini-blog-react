import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// import data from "../../data.json";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function PostViewPage() {
    const navigate = useNavigate();
    const { postId } = useParams();

    const [post, setPost] = useState([]);
    const [comment, setComment] = useState("");
    const [updateReply, setUpdateReply] = useState("");

    // post 관련
    useEffect(() => {
        axios.get(`/blog/get/${postId}`)
            .then(response => {
                setPost(response.data);
                console.log(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const eventDelete = () => {
        if(window.confirm("삭제하시겠습니까?")) {
            axios.post(`/blog/delete/${postId}`)
                .then(response => {
                    alert("삭제 완료");
                    navigate("/");
                })
                .catch(error => console.error(error));
        }
    }

    // Reply 관련
    const addReply = () => {
        axios.post(`/reply/write`, {
            content: comment,
            idx: postId // join된 값을 찾아서 처리하기 위해 적어줘야함
            })
            .then(response => {
                setUpdateReply(uuidv4()); // 글 올리고 나서 새로 고침하려고 이렇게 해둔건데... 이걸 안 쓰는 방법이 있을까?
                setComment("");
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        axios.get(`/blog/get/${postId}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => console.error(error));
    }, [updateReply]);

    return (
        <Wrapper>
            <Container>
                <Button
                    title="뒤로 가기"
                    onClick={() => {
                        navigate("/");
                    }}
                />
                <Button
                    title="수정"
                    onClick={() => {
                        navigate(`/post-edit/${postId}`);
                    }}
                />
                <Button
                    title="삭제"
                    onClick={() => {
                        eventDelete()
                    }}
                />
                <PostContainer>
                    <TitleText>{post.title}</TitleText>
                    <ContentText>{post.content}</ContentText>

                    <CommentLabel>댓글</CommentLabel>
                    <CommentList comments={post.blogReplyList} />

                    <TextInput height={40} value={comment}
                        onChange={(event) => {
                            setComment(event.target.value);
                        }}
                    />
                    <Button title="댓글 작성하기"
                        onClick={() => {
                            addReply()
                        }}
                    />
                </PostContainer>
            </Container>
        </Wrapper>
    )
}

export default PostViewPage;