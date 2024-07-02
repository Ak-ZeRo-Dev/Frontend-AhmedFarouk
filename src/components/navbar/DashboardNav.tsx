import Link from "next/link";

type Props = {};

export default function DashboardNav({}: Props) {
  return (
    <Link
      href={"/admin/dashboard"}
      className={`text-fourth max-lg:dark:text-fourth max-lg:text-sixth text-lg rounded-3xl p-1 px-4 bg-fifth hover:border-secondary hover:bg-secondary transition-all max-lg:hover:bg-fifth max-lg:bg-transparent max-lg:rounded-md max-lg:!p-2`}
    >
      لوحة التحكم
    </Link>
  );
}
