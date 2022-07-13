import { FastField, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { addUserThunk, fetchUsersThunk, selectUserList } from "app/slices/usersSlice";
import { User } from "models";

import InputField from "../components/InputField";
import styles from "../signIn.module.scss";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const userList: User[] = useAppSelector(selectUserList);

  const initialValues = {
    name: "",
    phone: "",
    pass: "",
    confirmPass: "",
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên tài khoản!"),
    phone: Yup.string()
      .required("Vui lòng nhập số điện thoại!")
      .matches(phoneRegExp, "Số điện thoại không đúng định dạng!")
      .test("checkValid", "Số điện thoại đã tồn tại", (value) => {
        let i = 0;
        userList.forEach((user: User) => {
          if (Number(user.phone) === Number(value)) {
            i++;
          }
        });

        if (i > 0) return false;
        else return true;
      }),
    pass: Yup.string()
      .required("Vui lòng nhập mật khẩu!")
      .test(
        "trim",
        "Mật khẩu không nên là một khoảng trắng",
        (value: any) => !/\s+/g.test(value)
      )
      .min(8, "Mật khẩu tối thiểu 8 ký tự!"),
    confirmPass: Yup.string()
      .required("Vui lòng nhập mật khẩu!")
      .oneOf([Yup.ref("pass")], "Mật khẩu không trùng khớp!"),
  });
  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, []);

  const handleCloseForm = () => {
    const form: HTMLElement | null = document.querySelector("#formSignUp");
    if (form) {
      form.style.display = "none";
    }
  };
  const handleSubmit = (values: any) => {
    const phone = values.phone;
    const name = values.name.replace(/\s+/g, " ").trim();
    const pass = values.pass;
    const newUser: User = { name, phone, pass };

    dispatch(addUserThunk(newUser));

    handleCloseForm();
  };
  return (
    <div className={styles.modal} id="formSignUp" onClick={handleCloseForm}>
      <div className={styles.main} onClick={(e) => e.stopPropagation()}>
        <div className={styles.logo}>
          <img src={require("assets/images/logo/logo_2.png")} alt="" />
        </div>
        <div className={styles.close} onClick={handleCloseForm}>
          <button>
            <FaTimes />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => {
            const { values, errors, touched, isSubmitting } = formikProps;

            // console.log({ values, errors, touched });
            return (
              <Form className={styles.form}>
                <h2> Đăng kí tài khoản Phúc Long</h2>
                <FastField
                  name="name"
                  component={InputField}
                  placeholder="Họ & tên*"
                />
                <FastField
                  name="phone"
                  component={InputField}
                  placeholder="Số điện thoại*"
                />
                <FastField
                  name="pass"
                  type="password"
                  component={InputField}
                  placeholder="Mật khẩu*"
                />
                <FastField
                  name="confirmPass"
                  type="password"
                  component={InputField}
                  placeholder="Nhập lại mật khẩu*"
                />

                <div className={styles.form_group}>
                  <button type="submit">Đăng kí</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
