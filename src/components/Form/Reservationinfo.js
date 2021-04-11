import React from 'react'
import 'antd/dist/antd.css';
import { Form, Input, Button, Cascader, Radio} from 'antd';

const countries = [
    {
      value: 'Republic of Korea',
      label: 'Republic of Korea',
    },
    {
        value: 'Australia',
        label: 'Australia',
      },
      {
        value: 'Estonia',
        label: 'Estonia',
      },
  ];

  const age_group = [
    {
      value: 1,
      label: '~ 19',
    },
    {
        value: 2,
        label: '20 ~ 29',
      },
      {
        value: 3,
        label: '30 ~ 39',
      },
      {
        value: 4,
        label: '40 ~ 49',
      },
      {
        value: 5,
        label: '50 ~ 59',
      },
      {
        value: 6,
        label: '60 ~',
      },
  ];

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  

const Reservationinfo = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
    return (
        <>
          <Form
      {...formItemLayout}
      form={form}
      name="reservation"
      onFinish={onFinish}
      scrollToFirstError
    >
        <Form.Item
            name="email"
            label="E-mail"
            rules={[
            {
                type: 'email',
                message: 'The input is not valid E-mail!',
            },
            {
                required: true,
                message: 'Please input your E-mail!',
            },
            ]}
        >
           <Input />
        </Form.Item>

        <Form.Item
            name="Firstname"
            label="Firstname"
            rules={[
            {
                required: true,
                message: 'Please input your firstname!',
            },
            ]}
        >
           <Input />
        </Form.Item>

        <Form.Item
            name="Lastname"
            label="Lastname"
            rules={[
            {
                required: true,
                message: 'Please input your Lastname!',
            },
            ]}
        >
           <Input />
        </Form.Item>

        <Form.Item
        name="country"
        label="Country"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please select your Country!',
          },
        ]}
      >
        <Cascader options={countries} />
      </Form.Item>

      <Form.Item
        name="age_group"
        label="Age Group"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please select your Age Group!',
          },
        ]}
      >
        <Cascader options={age_group} />
      </Form.Item>

      <Form.Item name="sex" label="Gender"
      rules={[
        {
          required: true,
          message: 'Please select your gender!',
        },
      ]}>
        <Radio.Group>
          <Radio value="1">Male</Radio>
          <Radio value="2">Female</Radio>
          
        </Radio.Group>
      </Form.Item>

        <Form.Item
            name="NA_foods"
            label="Allergy info"
            
        >
           <Input />
        </Form.Item>

        <Form.Item
            name="etc_info"
            label="message"
            
        >
           <Input />
        </Form.Item>


          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
            </Form.Item>
            </Form>
        </>
    )
}

export default Reservationinfo
