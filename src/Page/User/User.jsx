import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Space,
  Button,
  Popconfirm,
  Table,
  Row,
  Col,
  Typography,
  Tag,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import { QuestionCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { AddUser } from "./components/AddUser";
import Excel from "components/Excel";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const User = () => {
  const listUsers = useSelector((state) => state.users.listUsers);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [editRowKey, setEditRowKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [formAdd] = Form.useForm();
  let [filteredData] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 4,
    },
  });

  useEffect(() => {
    setLoading(true);
    dispatch.users.getUserAsync();
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: 100,
        // 200 is mock data, you should read it from server
        // total: data.totalCount,
      },
    });
    setLoading(false);
  }, [JSON.stringify(tableParams)]);

  const isEditing = (record) => record.key === editRowKey;

  const handleSave = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...listUsers];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        dispatch.users.SAVE_USER(newData);
        setEditRowKey("");
        messageApi.open({
          type: "success",
          content: `Edit user success`,
        });
      } else {
        newData.push(row);
        dispatch.users.SAVE_USER(newData);
        setEditRowKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleCancel = () => {
    setEditRowKey("");
  };

  const handleEdit = (record) => {
    form.setFieldValue({
      lastName: "",
      email: "",
      gender: "",
      ...record,
    });

    setEditRowKey(record.key);
  };
  const handleDelete = (id) => {
    dispatch.users.DELETE_USER(id);

    messageApi.open({
      type: "success",
      content: `Delete user id= ${id} success`,
    });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    //   // setGridData([]);
    // }
    setSortedInfo({ columnKey: sorter.field, order: sorter.order });
    setFilteredInfo(filters);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 100,
      fixed: "left",
    },
    {
      title: "Name",
      dataIndex: "lastName",
      align: "center",
      editTable: true,
      sorter: (a, b) => a.lastName.length - b.lastName.length,
      sortOrder: sortedInfo.columnKey === "lastName" ? sortedInfo.order : null,
      ellipsis: true,
      // ...GetColumnSearchProps("lastName"),
    },
    {
      title: "Age",
      dataIndex: "age",
      align: "center",
      editTable: true,
      sorter: (a, b) => a.age - b.age,
      ellipsis: true,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      align: "center",
      filters: [
        {
          text: "Male",
          value: "male",
        },
        {
          text: "Female",
          value: "female",
        },
      ],
      render: (gender) =>
        gender === "male" ? (
          <Tag color="cyan">{gender}</Tag>
        ) : (
          <Tag color="magenta">{gender}</Tag>
        ),
      filteredValue: filteredInfo.gender || null,
      onFilter: (value, record) => record.gender.includes(value),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      editTable: true,
      sorter: (a, b) => a.email.length - b.email.length,
      ellipsis: true,
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      align: "center",
    },
    {
      title: "Username",
      dataIndex: "username",
      align: "center",
    },
    {
      title: "Password",
      dataIndex: "password",
      align: "center",
    },
    {
      title: "Date of birth",
      dataIndex: "birthDate",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      align: "center",

      render: (image) => <img src={image} style={{ width: "100%" }} />,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      align: "center",
      width: 300,
      render: (item) => {
        const editTable = isEditing(item);
        return listUsers.length >= 1 ? (
          <Space>
            <Popconfirm
              title="Delete the User"
              description="Are you sure to delete this User?"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
              onConfirm={() => handleDelete(item.id)}
            >
              <Button danger type="primary" disabled={editTable}>
                Delete
              </Button>
            </Popconfirm>
            {editTable ? (
              <span>
                <Space size="middle">
                  <Button
                    onClick={() => handleSave(item.key)}
                    type="primary"
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </Button>
                  <Popconfirm
                    title="Are sure to cancel ?"
                    onConfirm={handleCancel}
                  >
                    <Button>Cancel</Button>
                  </Popconfirm>
                </Space>
              </span>
            ) : (
              <Button type="primary" onClick={() => handleEdit(item)}>
                Edit
              </Button>
            )}
          </Space>
        ) : null;
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editTable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const clearFilters = () => {
    setFilteredInfo({});
    dispatch.users.getUserAsync();
  };

  const clearAll = () => {
    setSortedInfo({});
    setFilteredInfo({});
    setSearchText("");

    dispatch.users.getUserAsync();
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      dispatch.users.getUserAsync();
    } else {
      dispatch.users.searchAsync(searchText);
    }
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseFormAdd = () => {
    setOpenDrawer(false);
    formAdd.resetFields();
  };

  const onSubmitFormAdd = () => {
    setLoading(true);
    const data = formAdd.getFieldsValue(true);
    dispatch.users.ADD_USER(JSON.stringify(data));
    setOpenDrawer(false);
    setLoading(false);
    messageApi.open({
      type: "success",
      content: `Add user success`,
    });
  };

  return (
    <>
      {contextHolder}
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>User</title>
        </Helmet>
        <Typography.Title level={3}>List Users</Typography.Title>
        <Row>
          <Col md={24}>
            <Form form={form} component={false}>
              <Table
                title={() => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={showDrawer}
                      icon={<PlusOutlined />}
                    >
                      Add User
                    </Button>

                    <div>
                      <Input
                        placeholder={`Enter Search Text`}
                        value={searchText}
                        onChange={handleInputChange}
                        type="text"
                        allowClear
                      />
                      {/* <Button onClick={globalSearch}>Search</Button> */}
                      <Button onClick={clearFilters}>Clear filters</Button>
                      <Button onClick={clearAll}>
                        Clear filters and sorters
                      </Button>
                    </div>
                    <Excel
                      fileName="export-user"
                      data={[
                        {
                          columns: [
                            {
                              title: "User Id",
                              dataIndex: "id",
                              width: 5,
                            },
                            {
                              title: "Name",
                              dataIndex: "username",
                              width: 20,
                            },
                            {
                              title: "Email",
                              dataIndex: "email",
                              width: 50,
                            },
                          ],
                          data: listUsers,
                          tabName: "info",
                        },
                        {
                          columns: [
                            {
                              title: "Name",
                              dataIndex: "username",
                              width: 30,
                            },
                            {
                              title: "Phone",
                              dataIndex: "phone",
                              width: 30,
                            },
                          ],
                          data: listUsers,
                          tabName: "contact",
                        },
                      ]}
                    >
                      <Button
                        style={{ backgroundColor: "#c2115e", color: "#fff" }}
                      >
                        Export
                      </Button>
                    </Excel>
                  </div>
                )}
                footer={() => "Footer"}
                scroll={{
                  x: 1300,
                }}
                tableLayout="fixed"
                columns={mergedColumns}
                bordered
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                dataSource={
                  filteredData && filteredData.length ? filteredData : listUsers
                }
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
              ></Table>
            </Form>
          </Col>
        </Row>
      </div>
      <AddUser
        open={openDrawer}
        onSubmit={onSubmitFormAdd}
        onClose={onCloseFormAdd}
        form={formAdd}
      />
    </>
  );
};

export default User;
