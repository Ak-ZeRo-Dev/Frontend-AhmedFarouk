import { Button } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import OTPInput from "react-otp-input";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useConfirmDeleteMutation,
  useDeleteAccountQuery,
} from "../../store/features/user/userApi";
import { selectVerifiedToken } from "../../store/features/user/userSlice";
import { verificationStyle } from "../../styles/styles";
import AnimationWrapper from "../../utils/AnimationWrapper";

type Props = {
  token: string;
};

type IDC = {
  token: string;
  router?: ReturnType<typeof useRouter>;
  setRoute: Dispatch<SetStateAction<string>>;
};

export default function DeleteAccount({ token }: Props) {
  const router = useRouter();
  const [route, setRoute] = useState<string>("delete");

  const renderContent = () => {
    switch (route) {
      case "delete":
        return <Delete token={token} setRoute={setRoute} />;
      case "confirm":
        return <Confirm token={token} setRoute={setRoute} router={router} />;
      default:
        return null;
    }
  };

  return renderContent();
}

const Delete: React.FC<IDC> = ({ token, setRoute }) => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { isSuccess, isError, error } = useDeleteAccountQuery(token, {
    skip: !isDeleted,
  });

  const handleDelete = () => {
    setIsDeleted(true);
  };

  useEffect(() => {
    if (isSuccess) {
      setRoute("confirm");
    }
    if (isError) {
      toast.error(
        (error as any)?.data?.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى."
      );
    }
  }, [isSuccess, isError, error, setRoute]);

  return (
    <AnimationWrapper
      container={"div"}
      className="h-screen flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold mb-4 dark:text-white">حذف حسابك</h1>
      <p className="mb-8 text-center dark:text-white max-md:px-7">
        هل أنت متأكد من رغبتك في حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه.
      </p>
      <button
        onClick={handleDelete}
        className="py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700"
      >
        نعم، احذف حسابي
      </button>
      <p className="mt-4 text-sm dark:text-white max-md:px-7 text-center">
        بحذف حسابك، ستفقد الوصول إلى جميع البيانات المرتبطة بهذا الحساب.
      </p>
    </AnimationWrapper>
  );
};

const Confirm: React.FC<IDC> = ({ token, setRoute, router }) => {
  const [confirmDelete, { isSuccess, isError, error }] =
    useConfirmDeleteMutation();
  const verificationToken = useSelector(selectVerifiedToken);
  const [clientCode, setClientCode] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      verificationToken,
      clientCode,
    };
    await confirmDelete({ data, token });
  };

  useEffect(() => {
    if (isSuccess) {
      signOut({ redirect: true, callbackUrl: "/" });
    }
    if (isError) {
      toast.error(
        (error as any)?.data?.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى."
      );
    }
  }, [isSuccess, isError, error, router]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRoute("delete");
    }, 5 * 60 * 1000);
    return () => clearTimeout(timeoutId);
  }, [setRoute]);

  return (
    <div className={verificationStyle.mainContainer}>
      <div className={verificationStyle.secondaryContainer}>
        <header className={verificationStyle.header}>
          <h1 className={verificationStyle.logo}>Ahmed Store</h1>
          <h2 className={verificationStyle.title}>حذف الحساب</h2>
        </header>
        <p className={verificationStyle.message}>
          لقد أرسلنا OTP إلى عنوان بريدك الإلكتروني. الرجاء إدخال OTP أدناه.
        </p>
        <form onSubmit={handleSubmit} className={verificationStyle.form}>
          <OTPInput
            value={clientCode}
            onChange={setClientCode}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            inputStyle={verificationStyle.input}
            containerStyle={verificationStyle.otpContainer}
            shouldAutoFocus
            skipDefaultStyles
          />
          <div className={verificationStyle.btnContainer}>
            <Button
              variant="contained"
              className={verificationStyle.back}
              onClick={() => setRoute("delete")}
            >
              رجوع
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={clientCode.length < 6}
              className={verificationStyle.delete}
            >
              حذف الحساب
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
