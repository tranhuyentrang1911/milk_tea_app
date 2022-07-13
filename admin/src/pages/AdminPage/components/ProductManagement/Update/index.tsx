import { Button } from "antd";
import { FastField, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import ProductApi from "api/productApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchCategory, selectCategoryList } from "app/slices/categorySlice";
import { updateProduct } from "app/slices/productSlice";
import { Category, Product } from "models";
import FileField from "pages/AdminPage/customsField/FileField";
import InputField from "pages/AdminPage/customsField/InputField";
import SelectField from "pages/AdminPage/customsField/SelectField";
import { showSuccess } from "utils";

import styles from "../../../styles/admin.module.scss";

const UpdateProduct = () => {
  const params = useParams();
  const productId = params.id;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    name: "",
    categoryId: "",
    categoryName: "",
    img: "1.png",
    price: 0,
  });
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  useEffect(() => {
    if (!productId) return;
    (async () => {
      const data: Product = await ProductApi.getById(productId);
      setProduct(data);
    })();
  }, [productId]);

  const categoryList: Category[] = useAppSelector(selectCategoryList);
  const categoryOption = categoryList.map((item) =>
    Object.assign({}, { value: item.id, label: item.name })
  );

  const initialValues = {
    name: product.name,
    categoryId: product.categoryId,
    img: null,
    price: product.price,
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
    const editProduct: Product = Object.assign(
      {},
      { ...values },
      {
        id: params.id,
        img: values.img.name,
        categoryName,
        price: Number(values.price),
      }
    );

    dispatch(updateProduct(editProduct));
    //Toast Message
    showSuccess("Update sản phẩm");
    navigate("/admin/product");
  };
  return (
    <>
      {/* <div>
        <Space split={<Divider type="vertical" />}>
          <Typography.Link>Link</Typography.Link>
          <Typography.Link>Link</Typography.Link>
          <Typography.Link>Link</Typography.Link>
        </Space>
      </div> */}
      <h2>Cập nhật sản phẩm</h2>
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

                <Button htmlType="submit">Cập nhật</Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default UpdateProduct;
