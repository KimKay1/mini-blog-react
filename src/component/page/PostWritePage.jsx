import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function PostWritePage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const submitBlog = () => {
        axios.post("/blog/write", {
            title: title,
            content: content
        })
            .then(() => {
                setTitle("");
                setContent("");

                alert("등록 완료");
                navigate("/");
            })
            .catch(err => console.error(err));
    }

    return (
        <Wrapper>
            <Container>
                <TextInput height={20} value={title}
                    onChange={(event) => { setTitle(event.target.value); }}
                    placeholder="제목을 입력해주세요."
                />
                <TextInput height={480} value={content}
                    onChange={(event) => { setContent(event.target.value); }}
                    placeholder="내용을 입력해주세요."
                />

                <Button title="글 작성하기"
                    onClick={submitBlog}
                />
            </Container>
        </Wrapper>
    );
}

export default PostWritePage;