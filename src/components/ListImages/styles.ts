import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  /* grid-template-columns: repeat(3, 1fr);; */
  grid-auto-rows: 1fr;
  /* grid: 150px / auto auto auto; */
  height: 80vh;
  width: 80vw;
  padding: 10px;
  grid-gap: 10px;
`;

export const Wrapper = styled.div`
  display: flex;
  border: 3px solid #FFF;
  box-shadow: 1px 1px 3px #AAA;
  max-width: 100%;

  &>.image-skeleton {
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

