import React, { useState } from "react";
import { IProduct } from "../../../types/product";
import AdminSidebar from "../AdminSidebar";
import { useSelector } from "react-redux";
import { selectIsSmall } from "../../../store/features/user/userSlice";
import { selectUser } from "../../../store/features/auth/authSlice";
import { section } from "../../../styles/styles";
import { useFormik } from "formik";
import { Typography } from "@mui/material";
import { IImage } from "../../../types/layout";
import Image from "next/image";
import Images from "../../images/ProductImages";

type Props = {
  product: IProduct;
  token: string;
  refetch: any;
};
type InitialValues = {};

const initialValues: InitialValues = {};

const validationSchema = {};

const onSubmit = (values: InitialValues) => {};

export default function AdminProduct({ product, token, refetch }: Props) {
  const user = useSelector(selectUser) as IUser;
  const small = useSelector(selectIsSmall);
  const [open, setOpen] = useState<boolean>(true);

  const contentMargin =
    !small && open ? "mr-[250px]" : !small || small ? "mr-[60px]" : null;

  const {
    _id,
    categories,
    colors,
    description,
    images,
    loveCount,
    price,
    rating,
    review,
    title,
    video,
    estimatedPrice,
  } = product;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  // const isLoading = isDeleteLoading || isBlockLoading || isUnblockLoading;
  return (
    <section className="container mx-auto pt-main min-h-screen">
      <AdminSidebar small={small} user={user} setOpen={setOpen} open={open} />
      {/* {isLoading && <LoadingContent isLoading={isLoading} />} */}
      <div className={`${contentMargin} ${section.admin} `}>
        <Images images={images} />
        <form className="w-full">
          <div>
            <Typography variant="h6">ID</Typography>
            <Typography variant="h6">{_id}</Typography>
          </div>
          <Input label="العنوان" value={title} type="title" />
          <Input label="السعر" value={price} type="price" />
          <Input
            label="السعر المقدر"
            value={estimatedPrice}
            type="estimatedPrice"
          />
        </form>
      </div>
    </section>
  );
}

const Input: React.FC<{ label: string; value: any; type: string }> = ({
  label,
  value,
  type,
}) => {
  return (
    <div>
      <label htmlFor={type}>{label}</label>
      <input type="text" value={value} id="label" className="w-1/2" />
    </div>
  );
};
