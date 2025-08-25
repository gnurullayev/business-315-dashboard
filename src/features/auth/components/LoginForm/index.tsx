import { Button, Form, Input, Modal } from "antd";
import { StyledForm } from "./style";
import { useLogin } from "../../hooks";
import { useState } from "react";
import ShowError from "../ShowError";

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm = () => {
  const { mutate, isPending } = useLogin();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = (values: LoginFormValues) => {
    const data = {
      employeeCode: values.username,
      externalEmployeeNumber: values.password,
      deviceId: "string",
    };

    mutate(data, {
      onError: (error: any) => {
        showModal();

        if (
          error.status === 404 ||
          error.status === 401 ||
          error.status === 403
        ) {
          form.setFields([
            {
              name: "username",
              errors: ["Username yoki parol noto'g'ri"],
              value: "",
            },
            {
              name: "password",
              errors: [""],
              value: "",
            },
          ]);
          setLoginError("login yoki parol noto'g'ri");
        } else if (error.response?.data?.message) {
          setLoginError(error.response?.data?.message);
        } else {
          setLoginError("login yoki parol noto'g'ri");
        }
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <StyledForm>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button danger onClick={() => setIsModalOpen(false)}>
            Ortga
          </Button>,
        ]}
      >
        <ShowError message={loginError} />
      </Modal>
      <div className="login_form">
        <div className="login_form__inner">
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Iltimos, foydalanuvchi nomini kiriting",
                },
                {
                  min: 3,
                  message:
                    "Username kamida 3 ta belgidan iborat bo‘lishi kerak",
                },
              ]}
            >
              <Input
                className="login_form__input_name"
                type="text"
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Iltimos, parolni kiriting" },
                {
                  min: 6,
                  message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak",
                },
              ]}
            >
              <Input.Password
                className="login_form__input_password"
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Button
              loading={isPending}
              disabled={isPending}
              className="login_form__button"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </StyledForm>
  );
};

export default LoginForm;
