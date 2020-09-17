import styled from 'styled-components';

import { FaImage } from 'react-icons/fa';

export const Container = styled.div`
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

export const PreviewImage = styled.img`
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

export const LoadImageIcon = styled(FaImage)`
  width: 30px;
  height: 30px;
  fill: #BBB;
`;
