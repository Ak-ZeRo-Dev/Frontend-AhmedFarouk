"use client";
import { useSelector } from "react-redux";
import {
  selectToken,
  selectUser,
} from "../../../store/features/auth/authSlice";
import { selectIsSmall } from "../../../store/features/user/userSlice";
import AdminSidebar from "../AdminSidebar";
type Props = {};

export default function Dashboard({}: Props) {
  const user = useSelector(selectUser) as IUser;
  const token = useSelector(selectToken);
  const small = useSelector(selectIsSmall);

  return (
    <section className="relative pt-main min-h-screen">
      <AdminSidebar small={small} user={user} />
    </section>
  );
}
