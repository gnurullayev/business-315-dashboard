import styled from "styled-components";

export const StyledForm = styled.div`
  .login_form {
    height: 100vh;
    max-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    form {
      width: 400px;
      display: flex;
      flex-direction: column;
    }

    &__input_name,
    &__input_password {
      max-width: 400px;
      min-width: 250px;
    }

    &__button {
      width: 100%;
      max-width: 400px;
      min-width: 250px;
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.4rem;
      text-align: center;
      border-radius: 12px;
      margin-top: 10px;
    }
  }

  .ant-form-item {
    margin-bottom: 16px !important;
  }
`;
