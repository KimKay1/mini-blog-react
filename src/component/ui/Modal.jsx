import React from 'react';
import styled from 'styled-components';
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import TextInput from "./TextInput";

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //background-color: rgba(0, 0, 0, 0.5); /* 반투명한 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid;
`;

// const CloseButton = styled.button`
//     position: absolute;
//     top: 10px;
//     right: 10px;
//     background: none;
//     border: none;
//     cursor: pointer;
// `;

function Modal({ comment, onClose , editReply, editComment, setEditComment, eventReplyDelete }) {
    const navigate = useNavigate();

    return (
        <ModalWrapper>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {/*<CloseButton onClick={onClose}>X</CloseButton>*/}

                <TextInput height={40} value={editComment}
                           onChange={(event) => {
                               setEditComment(
                                   event.target.value
                               );
                           }}
                />
                <Button
                    title="수정"
                    onClick={() => {
                        editReply();
                    }}
                />
                <Button
                    title="삭제"
                    onClick={() => {
                        eventReplyDelete()
                    }}
                />
                <Button
                    title="닫기"
                    onClick={onClose}
                />
            </ModalContent>
        </ModalWrapper>
    );
}

export default Modal;