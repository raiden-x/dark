import styled from "styled-components";

export const StyledTextField = styled.input`
  margin-top: 10px;
  background-color: transparent;
  box-sizing: border-box;
  border: 0px;
  border-bottom: 1px solid #85888c;
  color: whitesmoke;
  height: 24px;
  padding: 2px;
  width: 225px;
  :focus {
    outline: none;
    border-bottom: 2px solid #1a73e8;
  }
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-flow: column;
  margin: 10px 0px;
`;

export const StyledPaper = styled.div`
  display: flex;
  flex-flow: column;
  padding: 20px;
  background-color: #424242;
  box-shadow: 0 8px 6px -6px black;
  border-radius: 5px;
`;

export const LoginPage = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledPrimaryButton = styled.button`
  background-color: #3bbc53;
  border: 1px solid #3bbc53;
  color: whitesmoke;
  padding: 15px;
  font-weight: bold;
  border-radius: 25px;
  text-transform: uppercase;
  :focus {
    outline: none;
  }
  :hover {
    background-color: transparent;
    border: 1px solid whitesmoke;
    cursor: pointer;
    box-sizing: border-box;
  }
`;

export const ErrorDiv = styled.div`
  padding: 0.75rem 1.25rem;
  color: #cf6679;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
`;
