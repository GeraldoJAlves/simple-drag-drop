import styled from 'styled-components';


import {FaImage} from 'react-icons/fa';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  /* grid: 150px / auto auto auto; */
  height: 80vh;
  width: 80vw;
  padding: 10px;
  grid-gap: 10px;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  border: 3px solid #FFF;
  box-shadow: 1px 1px 3px #AAA;
  max-width: 100%;

  &>.image-skeleton {
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const ImgFile = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const LoadImageIcon = styled(FaImage)`
  width: 30px;
  height: 30px;
  fill: #BBB;
`;

