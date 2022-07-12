import { Button } from "antd";
import { FastField, Form, Formik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchCategory, selectCategoryList } from "app/slices/categorySlice";
import { addProduct } from "app/slices/productSlice";
import { Category, Product } from "models";
import FileField from "pages/AdminPage/customsField/FileField";
import InputField from "pages/AdminPage/customsField/InputField";
import SelectField from "pages/AdminPage/customsField/SelectField";

import styles from "../../../styles/admin.module.scss";

const AddProduct = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  const categoryList: Category[] = useAppSelector(selectCategoryList);
  const categoryOption = categoryList.map((item) =>
    Object.assign({}, { value: item.id, label: item.name })
  );

  const initialValues = {
    name: "",
    categoryId: null,
    img: null,
    price: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập trường này!"),
    categoryId: Yup.number()
      .required("Vui lòng chọn loại danh mục!")
      .nullable(),
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
    price: Yup.string()
      .required("Vui lòng nhập trường này")
      .matches(/^[0-9]+$/, "Giá tiền phải là một số")
      .test(
        "validatePrice",
        "Giá tiền không được nhỏ hơn 10.000đ và lớn hơn 1.000.000đ",
        (value: any) => {
          return value && value >= 10000 && value <= 1000000;
        }
      ),
  });
  const onSubmit = (values: any) => {
    let categoryName = "";
    categoryList.forEach((item) => {
      if (item.id === values.categoryId) {
        categoryName = item.name;
      }
    });
    const newProduct: Product = Object.assign(
      {},
      { ...values },
      { img: values.img.name, categoryName, price: Number(values.price) }
    );

    dispatch(addProduct(newProduct));
  };
  return (
    <>
      <h2>Tạo sản phẩm mới</h2>
      <div className={styles.form}>
        <Formik
          enableReinitialize={true}
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
                  label="Tên sản phẩm"
                  name="name"
                  component={InputField}
                  placeholder="Nhập tên sản phẩm*"
                />
                <FastField
                  label="Danh mục"
                  name="categoryId"
                  component={SelectField}
                  options={categoryOption}
                  disabled={false}
                  placeholder="Chọn loại danh mục*"
                />
                <FastField
                  type="file"
                  label="Upload File"
                  name="img"
                  component={FileField}
                />
                <FastField
                  label="Giá tiền"
                  name="price"
                  component={InputField}
                  placeholder="Nhập giá sản phẩm*"
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

export default AddProduct;
