import { Button } from "antd";
import { FastField, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { useAppDispatch } from "app/hooks";
import { addCategory } from "app/slices/categorySlice";
import { Category } from "models";
import FileField from "pages/AdminPage/customsField/FileField";
import InputField from "pages/AdminPage/customsField/InputField";
import { showMessage, showSuccess } from "utils";

import styles from "../../../styles/admin.module.scss";

const AddCategory = () => {
  const initialValues = {
    name: "",
    img: null,
  };

  //const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (values: any) => {
    const name = values.name;
    const img = values.img.name;
    const newCategory: Category = { name, img };
    dispatch(addCategory(newCategory));
    showSuccess("Thêm danh mục");
    navigate("/admin");
  };
  return (
    <>
      <h2>Tạo danh mục mới</h2>
      <div className={styles.form}>
        <Formik
          initialValues={initialValues}
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

                <Button htmlType="submit">Thêm mới</Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default AddCategory;
