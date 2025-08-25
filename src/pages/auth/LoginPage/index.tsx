import ErrorBoundary from "@/components/ErrorBoundary";
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <>
      <ErrorBoundary>
        <LoginForm />
      </ErrorBoundary>
    </>
  );
};

export default LoginPage;
