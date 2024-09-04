import styled from "styled-components";

export const InputContainer = styled.div`
    margin-bottom: 16px;
    background-color: #260e69;
`;

export const Label = styled.label`
    display: block;
    font-size: 1rem;
    font-weight: 600;
    color: #f3f4f6;
    margin-bottom: 8px;
`;

export const Input = styled.input`
    width: 30%;
    padding: 15px;
    font-size: 1.2rem;
    border-radius: 50px;
    border: 2px solid white;
    background-color: transparent;
    color: white;
    margin-bottom: 20px;
    outline: none;
}

input::placeholder {
    color: rgba(255, 255, 255, 0.7); /* Placeholder semi-transparente */
}
`;