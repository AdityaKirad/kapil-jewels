import { ForgotPasswordForm } from "./form";

export default function Page() {
  return (
    <>
      <h2 className="font-libre-baskerville text-5xl">Reset your password</h2>
      <p className="mt-12 mb-8 text-sm font-light">
        We will send you an email to reset your password.
      </p>
      <ForgotPasswordForm />
    </>
  );
}
