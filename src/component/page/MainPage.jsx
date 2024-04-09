import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../list/PostList";
import Button from "../ui/Button";
import axios from "axios";
import SearchBox from "../ui/SearchBox";

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

function MainPage() {
    const navigete = useNavigate(); // 훅
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);

    const fetchSearchResults = async (searchTerm) => {
        try {
            const response = await axios.get(`/blog/list?searchTerm=${searchTerm}`);
            return response.data; // 서버로부터 받은 데이터를 반환
        } catch (error) {
            console.error('Error fetching search results:', error);
            throw error; // 에러를 잡아서 처리
        }
    };

    const handleSearch = (searchTerm) => {
        // console.log('검색어:', searchTerm);
        fetchSearchResults(searchTerm)
            .then(data => {
                setData(data)
            })
            .catch(error => {
                console.error('Error fetching search results:', error); // 에러 처리
            });
    };

    useEffect(() => {
        axios.get("/blog/list")
            .then(response => {
                console.log(response.data);
                setData(response.data)
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        setSearchData(data)
    }, [data, setSearchData])

    return (
        <div>

            <Wrapper>
                <SearchBox onSearch={handleSearch} />
                <Container>
                    <Button
                        title="글 작성하기"
                        onClick={() => {
                            navigete("/post-write");
                        }}
                    />

                    <PostList
                        posts={data}
                        onClickItem={(item) => {
                            navigete(`/post/${item.idx}`);
                        }}
                    />
                </Container>
            </Wrapper>
        </div>
    )
}

export default MainPage;