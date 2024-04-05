import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import axios from "axios";

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

function PostEditPage() {
    const navigate = useNavigate();
    const { postId } = useParams();

    const [post, setPost] = useState({
        title: "",
        content: ""
    });

    useEffect(() => {
        axios.get(`/blog/get/${postId}`)
            .then(response => setPost({
                title: response.data.title,
                content: response.data.content,
            }))
            .catch(error => console.error(error));
    }, []);

    const submitBlog = () => {
        axios.post("/blog/write", {
            idx: postId,
            title: post.title,
            content: post.content,
        })
            .then(() => {
                setPost({
                    title: "",
                    content: "",
                });

                alert("수정 완료");
                navigate(`/post/${postId}`);
            })
            .catch(err => console.error(err));
    }

    return (
        <Wrapper>
            <Container>
                <TextInput height={20} value={post.title}
                    onChange={(event) => {
                        setPost({
                            ...post,
                            title: event.target.value,
                        });
                    }}
                />
                <TextInput height={480} value={post.content}
                    onChange={(event) => {
                        setPost({
                            ...post,
                            content: event.target.value
                        });
                    }}
                />

                <Button title="글 수정하기"
                    onClick={submitBlog}
                />
            </Container>
        </Wrapper>
    );
}

export default PostEditPage;