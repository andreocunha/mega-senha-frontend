import styled from "styled-components";


export const TipsAndKicksWrapper = styled.div`
  margin-top: 40px;
  max-height: 40vh;

  overflow-y: scroll;

  ::-webkit-scrollbar-track {
    background-color: #f4f4f4;
  }
  ::-webkit-scrollbar {
    width: 6px;
    background: #f4f4f4;
  }
  ::-webkit-scrollbar-thumb {
    background: #0250be;
  }
`;