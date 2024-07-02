"use client";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLoadUserQuery } from "../../store/features/api/apiSlice";
import { selectToken, selectUser } from "../../store/features/auth/authSlice";
import { selectIsSmall } from "../../store/features/user/userSlice";
import AnimationWrapper from "../../utils/AnimationWrapper";
import DeleteAccount from "./DeleteAccount";
import EditEmail from "./EditEmail";
import EditInfo from "./EditInfo";
import EditPassword from "./EditPassword";
import Favorite from "./Favorite";
import Info from "./Info";
import MeSidebar from "./MeSidebar";
import { selectUserBackground } from "../../store/features/layout/layoutSlice";

export default function Me() {
  const [route, setRoute] = useState<string>(
    () => sessionStorage.getItem("profile-route") || "info"
  );

  const user = useSelector(selectUser) as IUser;
  const background = useSelector(selectUserBackground);
  const token = useSelector(selectToken) as string;
  const small = useSelector(selectIsSmall);

  const { refetch, isLoading } = useLoadUserQuery(token as string);

  useEffect(() => {
    sessionStorage.setItem("profile-route", route);
  }, [route]);

  const contentMargin = useMemo(() => small && "mr-[60px]", [small]);

  const renderContent = () => {
    switch (route) {
      case "info":
        return <Info user={user} background={background} />;
      case "favorite":
        return <Favorite user={user} />;
      case "edit-info":
        return (
          <EditInfo
            user={user}
            background={background}
            token={token}
            refetch={refetch}
            isLoading={isLoading}
          />
        );
      case "edit-email":
        return (
          <EditEmail
            user={user}
            token={token}
            refetch={refetch}
            isLoading={isLoading}
          />
        );
      case "edit-password":
        return (
          <EditPassword token={token} refetch={refetch} isLoading={isLoading} />
        );
      case "delete-account":
        return <DeleteAccount token={token} />;
      default:
        return null;
    }
  };

  return (
    <main className="relative min-h-screen w-full pt-main dark:bg-gray-900 flex">
      <MeSidebar setRoute={setRoute} route={route} small={small} user={user} />
      <AnimationWrapper
        container={"section"}
        className={`relative pb-8 ${contentMargin} ${
          small ? "flex-1" : "w-full"
        }`}
      >
        {renderContent()}
      </AnimationWrapper>
    </main>
  );
}
