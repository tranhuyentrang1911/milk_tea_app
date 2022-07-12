import { Button, Input } from "antd";
import cx from "classnames";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { signInThunk } from "app/slices/adminSlice";
import Loading from "components/Loading";
import { Admin } from "models";

import styles from "./login.module.scss";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues: Admin = {
    name: "",
    pass: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên tài khoản"),
      pass: Yup.string()
        .required("Vui lòng nhập mật khẩu")
        .min(8, "Nhập tối thiểu là 8 kí tự"),
    }),

    onSubmit: async (values: any) => {
      alert("hello");
      console.log(values);
      await dispatch(signInThunk(values));
      navigate("/admin");
    },
  });
  const loading = useAppSelector((state) => state.admin.status);

  useEffect(() => {
    const loadingModal: HTMLElement = document.getElementById(
      "loading"
    ) as HTMLElement;
    if (loadingModal) {
      if (loading === "loading") {
        loadingModal.style.display = "flex";
      } else {
        loadingModal.style.display = "none";
      }
    }
  }, [loading]);
  return (
    <form className={styles.container} onSubmit={formik.handleSubmit}>
      <Loading />
      <h2>Đăng nhập</h2>
      <div className={styles.form_group}>
        <Input
          placeholder="Nhập tên tài khoản"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.errors.name && formik.touched.name
              ? cx(styles.input, styles.active)
              : styles.input
          }
        />

        {formik.errors.name && formik.touched.name && (
          <small>{formik.errors.name}</small>
        )}
      </div>
      <div className={styles.form_group}>
        <Input
          placeholder="Nhập mật khẩu"
          name="pass"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.errors.pass && formik.touched.pass
              ? cx(styles.input, styles.active)
              : styles.input
          }
        />
        {formik.errors.pass && formik.touched.pass && (
          <small>{formik.errors.pass}</small>
        )}
      </div>
      <div>
        <Button size="large" htmlType="submit">
          Đăng nhập
        </Button>
      </div>
    </form>
  );
};

export default LoginPage;
