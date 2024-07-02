import Me from "../../../components/users/Me";

type Props = {
  params: {
    userId: string;
  };
};

export default function page({ params: { userId } }: Props) {
  return <Me />;
}
