import styled from 'styled-components';


import {FaImage} from 'react-icons/fa';

export const Container = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  /* grid: 150px / auto auto auto; */
  height: 80vh;
  width: 80vw;
  padding: 10px;
  grid-gap: 10px;

  @media (min-width: 600px) {
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  max-width: 100%;
  max-height: 100%;

  &>.image-skeleton {
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const DeleteButton = styled.div`
  cursor: pointer;
  position: absolute;
  display:flex;
  align-items:center;
  justify-content: center;
  top: 5px;
  right: 10px;
  background: black;
  color: white;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  &::after {
    content: 'X';
  }
  transition: transform .5s;
  &:hover {
    transform: scale(1.2);
  }
`;

export const Video = styled.video`
  width: 100%;
`;

export const ImgFile = styled.img`

  border: 3px solid #FFF;
  box-shadow: 1px 1px 3px #AAA;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const TextFile = styled.textarea`
  padding: 10px;
  width: 100%;
  height: 100%;
  flex: 1;
  resize: none;
  text-align: start;
  background: black;
  color: white;
`;

export const LoadImageIcon = styled(FaImage)`
  width: 30px;
  height: 30px;
  fill: #BBB;
`;

