import styled from "styled-components";

const StyledButton = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    cursor: pointer;
`;

function Button(props) {
    const { title, onClick } = props;

     // title값이 없으면 button이라고 뜨게함
    return <StyledButton onClick={onClick}>{title || "button"} </StyledButton>;
}

export default Button;