/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, Button, Tabs, message } from "antd";
import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import UnionProfile from "../dashboard/UnionProfile";
import { useBankDetailsQuery, useChangePasswordMutation, useSetBankAccountMutation } from "@/redux/api/auth/authApi";
import Loader from "@/components/reusable/Loader";

const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {
  const [setBankAccount, { isLoading }] = useSetBankAccountMutation()
  const token = localStorage.getItem("token");
  const [changePassword, { isLoading: chaningPass }] =
    useChangePasswordMutation();
  // const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const { data, isLoading: getting } = useBankDetailsQuery(token)
  // const onProfileFinish = (values: any) => {
  //   console.log("Received profile values: ", values);
  // };

  const onPasswordFinish = async (values: any) => {
    try {
      const res = await changePassword({ data: values, token }).unwrap();
      if (res.status_code === 200 && !res.isError) {
        message.success("পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে।");
      } else {
        const errorMessage =
          res.data?.message ||
          res.error?.message ||
          "An error occurred while updating the password.";
        message.error(errorMessage);
      }
    } catch (error) {
      message.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleBankFormSubmit = async (values: any) => {
    const res = await setBankAccount({ data: values, token }).unwrap()
    console.log(res);
    if (res.status_code == 200) {
      message.success("ব্যাংক একাউন্ট সফলভাবে যোগ করা হয়েছে।");
    }
  };


  if (getting) {
    return <Loader />
  }
  return (
    <div className="container card p-4">
      <Breadcrumbs current="প্রোফাইল" />
      <div className="">
        <Tabs defaultActiveKey="1">
          {/* প্রোফাইল আপডেট ট্যাব */}
          {/* <TabPane tab="প্রোফাইল আপডেট" key="1">
            <Form
              className="row mx-auto"
              form={profileForm}
              name="profile_form"
              onFinish={onProfileFinish}
              layout="vertical"
            >
              <Form.Item className="col-md-6" label="নাম" name="name">
                <Input style={{ height: 40 }} />
              </Form.Item>

              <Form.Item className="col-md-6" label="জেলা" name="district">
                <Input style={{ height: 40 }} />
              </Form.Item>

              <Form.Item className="col-md-6" label="উপজেলা" name="upazila">
                <Input style={{ height: 40 }} />
              </Form.Item>

              <Form.Item
                className="col-md-6"
                label="মোবাইল নম্বর"
                name="mobile"
              >
                <Input style={{ height: 40 }} />
              </Form.Item>

              <Form.Item className="col-md-6" label="ইমেইল" name="email">
                <Input style={{ height: 40 }} />
              </Form.Item>

              <Form.Item className="col-md-6">
                <Button type="primary" htmlType="submit">
                  প্রোফাইল আপডেট করুন
                </Button>
              </Form.Item>
            </Form>
          </TabPane> */}

          {/* পাসওয়ার্ড পরিবর্তন ট্যাব */}

          <TabPane
            tab="পৌরসভা প্রোফাইল
"
            key="3"
          >
            <UnionProfile />
          </TabPane>

          {/* bank account */}
          <TabPane tab="ব্যাংক অ্যাকাউন্ট সেটআপ" key="4">
            <Form initialValues={data?.data}
              onFinish={handleBankFormSubmit}
              className="row mx-auto" layout="vertical">
              <Form.Item className="col-md-6" label="ব্যাংকের নাম" name="bank_name">
                <Input style={{ height: 40 }} />
              </Form.Item>

              <Form.Item className="col-md-6" label="ব্রাঞ্চের নাম" name="branch_name">
                <Input style={{ height: 40 }} />
              </Form.Item>

              <Form.Item className="col-md-6" label="অ্যাকাউন্ট নম্বর" name="account_no">
                <Input style={{ height: 40 }} />
              </Form.Item>

              <Form.Item className="col-md-6" label="অ্যাকাউন্টের নাম" name="account_name">
                <Input style={{ height: 40 }} />
              </Form.Item>

              <Form.Item className="col-md-6" label="রাউটিং নম্বর" name="routing_no">
                <Input style={{ height: 40 }} />
              </Form.Item>

              <Form.Item className="col-md-12">
                <Button loading={isLoading} disabled={isLoading} type="primary" htmlType="submit">
                  সংরক্ষণ করুন
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="পাসওয়ার্ড পরিবর্তন" key="2">
            <Form
              className="row mx-auto"
              form={passwordForm}
              name="password_form"
              onFinish={onPasswordFinish}
              layout="vertical"
            >
              <Form.Item
                className="col-md-6"
                label="বর্তমান পাসওয়ার্ড"
                name="current_password"
                rules={[
                  {
                    required: true,
                    message: "দয়া করে আপনার বর্তমান পাসওয়ার্ড লিখুন!",
                  },
                ]}
              >
                <Input.Password style={{ height: 40 }} />
              </Form.Item>

              <Form.Item
                className="col-md-6"
                label="নতুন পাসওয়ার্ড"
                name="new_password"
                rules={[
                  {
                    required: true,
                    message: "দয়া করে আপনার নতুন পাসওয়ার্ড লিখুন!",
                  },
                ]}
              >
                <Input.Password min={8} style={{ height: 40 }} />
              </Form.Item>

              <Form.Item
                className="col-md-6"
                label="নতুন পাসওয়ার্ড নিশ্চিত করুন"
                name="new_password_confirmation"
                dependencies={["new_password"]}
                rules={[
                  {
                    required: true,
                    message: "দয়া করে আপনার নতুন পাসওয়ার্ড নিশ্চিত করুন!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("new_password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("আপনার প্রবেশ করানো দুটি পাসওয়ার্ড মেলে না!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password min={8} style={{ height: 40 }} />
              </Form.Item>

              <Form.Item className="col-md-6">
                <Button
                  disabled={chaningPass}
                  loading={chaningPass}
                  type="primary"
                  htmlType="submit"
                >
                  পাসওয়ার্ড পরিবর্তন করুন
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
