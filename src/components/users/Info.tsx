import Image from "next/image";
import React from "react";
import { def } from "../../styles/styles";

type Props = {
  user: IUser;
  background: string;
};

export default function Info({ user, background }: Props) {
  const avatar: any = user.avatar.url || user.avatar;

  const {
    name,
    email,
    phone,
    gender,
    isVerified,
    isBlocked,
    blockCount,
    role,
  } = user;

  const genderLabel =
    gender === "male" ? "ذكر" : gender === "female" ? "أنثى" : "لا يوجد";
  const roleLabel =
    role === "admin" ? "مسؤول" : role === "master" ? "مالك" : "مستخدم";

  return (
    <>
      <div className="relative">
        <Image
          src={background}
          alt="background"
          width={5000}
          height={5000}
          className="w-full h-60 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Image
          src={avatar}
          alt="avatar"
          width={5000}
          height={5000}
          sizes="w-full h-full"
          className="w-28 h-28 rounded-full absolute -bottom-12 left-1/2 transform -translate-x-1/2 border-4 border-dark dark:border-secondary"
          priority
        />
      </div>
      <div
        className={`mt-10 px-10 max-md:px-0 flex flex-col gap-5 ${def.text}`}
      >
        <InfoItem label="الأسم" value={name} />
        <InfoItem label="البريد الالكتروني" value={email} />
        <InfoItem label="رقم الموبيل" value={phone ? phone : "لا يوجد"} />
        <InfoItem label="الجنس" value={genderLabel} />
        <InfoItem label="موثق" value={isVerified ? "نعم" : "لا"} />
        {isBlocked && (
          <InfoItem label="محظور" value={isBlocked ? "نعم" : "لا"} />
        )}
        {blockCount > 0 && (
          <InfoItem label="عدد المرات المحظورة" value={blockCount} />
        )}
        <InfoItem label="الدور" value={roleLabel} />
      </div>
    </>
  );
}

const InfoItem: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <>
    {["الأسم", "البريد الالكتروني"].includes(label) ? (
      <div className="flex items-center gap-3 max-md:flex-col max-md:items-start max-md:pr-8 max-md:pt-2 max-md:gap-2">
        <p className="text-xl font-semibold">{label}:</p>
        <p className="text-xl max-md:pr-3">{value}</p>
      </div>
    ) : (
      <div className="flex items-center gap-3 max-md:pr-8 max-md:pt-2 max-md:gap-2">
        <p className="text-xl font-semibold">{label}:</p>
        <p className="text-xl">{value}</p>
      </div>
    )}
  </>
);
