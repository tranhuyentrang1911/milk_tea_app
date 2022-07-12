import { Button } from "antd";
import { FastField, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import CategoryApi from "api/categoryApi";
import { useAppDispatch } from "app/hooks";
import { updateCategory } from "app/slices/categorySlice";
import { Category } from "models";
import FileField from "pages/AdminPage/customsField/FileField";
import InputField from "pages/AdminPage/customsField/InputField";

import styles from "../../../styles/admin.module.scss";

const UpdateCategory: React.FC = () => {
  const params = useParams();
  const categoryId = params.id;
  const dispatch = useAppDispatch();

  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    img: "",
  });
  const initialValues = { ...category, img: null };

  useEffect(() => {
    if (!categoryId) return;
    (async () => {
      const data: Category = await CategoryApi.getById(categoryId);
      setCategory(data);
    })();
  }, [categoryId]);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập trường này!"),
    img: Yup.mixed()
      .nullable()
      .required("Không có tệp nào được chọn")
      .test(
        "type",
        "File không đúng định dạng là một hình ảnh: .jpeg, .jpg, .png",
        (value) => {
          return (
            value &&
            (value.type === "image/jpeg" ||
              value.type === "image/jpg" ||
              value.type === "image/png")
          );
        }
      )
      .test("fileSize", "Kích cỡ ảnh quá lớn", (value) => {
        return value && value.size <= 2000000;
      }),
  });
  const onSubmit = (values: any) => {
    const id = categoryId;
    const name = values.name;
    const img = values.img.name;
    dispatch(updateCategory({ id, name, img }));
  };
  return (
    <>
      <h2>Chỉnh sửa danh mục</h2>
      <div className={styles.form}>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => onSubmit(values)}
        >
          {(formikProps) => {
            const { values, errors, touched, isSubmitting } = formikProps;
            console.log({ values, errors, touched, isSubmitting });
            return (
              <Form>
                <FastField
                  label="Tên danh mục"
                  name="name"
                  component={InputField}
                  placeholder="Nhập tên danh mục*"
                />

                <FastField
                  type="file"
                  label="Upload File"
                  name="img"
                  component={FileField}
                />

                <Button htmlType="submit">Update</Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default UpdateCategory;
