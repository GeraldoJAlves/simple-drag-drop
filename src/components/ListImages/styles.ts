import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-row-gap: 5px;
  grid-template-columns: auto auto auto;
  height: 80vh;
  width: 80vw;
  border: 1px solid #ddd;
`;

export const Wrapper = styled.div`
  padding: 5px;
  width: 100%;
  height: 100%;
`;

export const ImgFile = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

