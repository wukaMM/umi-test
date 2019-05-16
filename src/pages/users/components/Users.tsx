import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import React from 'react';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../constants';
import UserModal from './UserModal';
import { number } from 'prop-types';

export interface IProps {
  dispatch: any;
  list: string[];
  total: number;
  page: number;
  loading: boolean;
}

interface PageStates { };

class Users extends React.Component<IProps, PageStates> {

  constructor(props: IProps, context: PageStates) {
    super(props, context);
  };

  deleteHandler(id: number) {
    this.props.dispatch({
      type: 'users/remove',
      payload: id,
    })
  };

  pageChangeHandler(page) {
    this.props.dispatch(routerRedux.push({
      pathname: '/users',
      search: `?page=${page}`
    }))
  };

  editHandler(id: number, values: object) {
    this.props.dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  };

  createHandler(values: object) {
    this.props.dispatch({
      type: 'users/create',
      payload: { values },
    });
  };

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (record: any) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={this.editHandler.bind(this, record.id)}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={this.deleteHandler.bind(this, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  render() {
    return (
      <div className={styles.normal}>
        <div>
          <div className={styles.create}>
            <UserModal record={{}} onOk={this.createHandler.bind(this)}>
              <Button type="primary">Create User</Button>
            </UserModal>
          </div>
          <Table
            loading={this.props.loading}
            columns={this.columns}
            dataSource={this.props.list}
            rowKey={(record: any) => record.id}
            pagination={false}
          />
          <Pagination
            className="ant-table-pagination"
            total={this.props.total}
            current={this.props.page}
            pageSize={PAGE_SIZE}
            onChange={this.pageChangeHandler.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { list, total, page } = state.users;
  return {
    list,
    total,
    page,
    loading: state.loading.models.users,
  };
};

export default connect(mapStateToProps)(Users);
