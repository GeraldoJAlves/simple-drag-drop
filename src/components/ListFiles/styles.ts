import styled, { css } from 'styled-components';


import {FaImage, FaStepForward, FaStepBackward, FaTrash, FaFastForward, FaFastBackward, FaChevronUp, FaChevronDown} from 'react-icons/fa';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* grid-auto-columns: 1fr;
  grid-auto-rows: 1fr; */
  /* grid: 150px / auto auto auto; */
  height: 100vh;
  width: 100vw;
  /* grid-gap: 10px; */
  @media (min-width: 600px) {
  }
`;

export const Preview = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  &>.image-skeleton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100%;
  }
`;

export const PreviewText = styled.textarea`
  cursor: pointer;
  padding: 10px;
  flex: 1;
  font-size: 1px;
  resize: none;
  text-align: start;
  background: black;
  border: none;
  color: white;
  outline: 0;
  opacity: 0.5;
  min-width: 100px;
  max-width: 100px;
  transition: opacity 0.5s;
  overflow-x: hidden;
  overflow-y: hidden;
  &.active{
    opacity: 1;
    cursor: default;
    border: solid #333 .3px;
  }
  &:hover{
    opacity: 1;
  }
`;

export const PreviewItem = styled.img`
  cursor: pointer;
  object-fit: contain;
  border: 2px solid black;
  max-width: 100px;
  opacity: 0.5;
  transition: opacity 0.5s;
  &.active{
    opacity: 1;
    cursor: unset;
    border: solid #333 .3px;
  }
  &:hover{
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  align-items: stretch;
  height: 90vh;
  width: 100vw;
  &>.image-skeleton {
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const ToolBar = styled.div`
  cursor: pointer;
  padding: 0 10px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background: black;
  &>span {
    color: white;
    font-weight: bold;
  }
`;

const cssIcons = css`
  color: white;
  width: 25px;
  height: 25px;
  transition: transform .5s, opacity 0.2s;
  &.disable{
    opacity:0.5;
    &:hover {
      transform: scale(1);
    }
  }
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    opacity: 0.7;
  }
`;

export const DeleteIcon = styled(FaTrash)`
  ${cssIcons}
`;

export const PreviewIconOpen = styled(FaChevronUp)`
  ${cssIcons}
`;

export const PreviewIconClose = styled(FaChevronDown)`
  ${cssIcons}
`;

export const LastIcon = styled(FaFastForward)`
  ${cssIcons}
`;

export const FirstIcon = styled(FaFastBackward)`
  ${cssIcons}
`;

export const NextIcon = styled(FaStepForward)`
  ${cssIcons}
`;

export const PrevIcon = styled(FaStepBackward)`
  ${cssIcons}
`;


export const Video = styled.video`
  object-fit: contain;
  width: 100%;
  height: 60vh;
  flex:1;
  background: black;
  border: none;
  outline: 0;
`;


export const ImgFile = styled.img`
  /* object-fit: contain; */
  object-fit: contain;
  width: 100%;

  height: 80vh;
  flex:1;
`;

export const TextFile = styled.textarea`
  padding: 10px;
  flex: 1;
  resize: none;
  text-align: start;
  background: black;
  border: none;
  color: white;
  outline: 0;
`;

export const LoadImageIcon = styled(FaImage)`
  width: 30px;
  height: 30px;
  fill: #BBB;
`;

