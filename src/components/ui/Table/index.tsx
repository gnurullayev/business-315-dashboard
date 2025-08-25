import { App, Table as AntDTable } from "antd";

const Table = ({
  resourceUrl,
  totalRecords,
  loadedData,
  setLoadedData,
  setTotalRecords,
  setCurrentPageSize,
  currentPage,
  setCurrentPage,
  setLoading,
  loading,
  columns,
  pageSizeOptions,
  getRecords,
  filter,
  hasSelection,
  selectAll,
  setSelectAll,
  setSelectedData,
  selectedRowsLength,
  setSelectedRowsLength,
  selectedData,
  customRowSelection,
  setCustomRowSelection,
  pagination = false,
  customRowKey,
  ...props
}: any) => {
  const { message } = App.useApp();
  const showTotal = (_: any, range: any) => {
    return `${range[0]}-${range[1]} ${totalRecords}`;
  };

  const goToPage = async (page: any, pageSize: any) => {
    try {
      setLoading(true);

      let pageQuery = "page[number]=" + page + "&page[size]=" + pageSize;

      if (filter) {
        pageQuery += `&`;
      }

      let records = await getRecords(resourceUrl, pageQuery);

      setLoadedData(records.data);
      setTotalRecords(records.pagination.total);
      setCurrentPageSize(records.pagination.per_page);
      setCurrentPage(page);

      if (hasSelection) {
        if (selectAll) {
          let selectedData = records.data.filter((item: any) =>
            item.roles.includes("STUDENT")
              ? !item.studentUserTypeUuid.includes(
                  customRowSelection.deSelectedUsers
                )
              : !item.customerAdminUserTypeUuid.includes(
                  customRowSelection.deSelectedUsers
                )
          );
          setSelectedData(selectedData);
        } else {
          let selectedData: any = [];

          records.data.map((item: any) => {
            let uuid = item.roles.includes("STUDENT")
              ? item.studentUserTypeUuid
              : item.customerAdminUserTypeUuid;

            if (customRowSelection.selectedUsers.includes(uuid)) {
              selectedData.push(item);
            }
            return selectedData;
          });

          setSelectedData(selectedData);
        }
      }
    } catch (err: any) {
      message.error(err.message);
      // console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const changeSize = async (_: any, size: any) => {
    goToPage(1, size);
  };

  const getCurrentPage = () => {
    return Number(currentPage);
  };

  const rowSelection = {
    selectedRowKeys: selectedData
      ? selectedData.map((data: any) => data.id)
      : [],
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      if (selected) {
        let selectedUsers = customRowSelection.selectedUsers;

        selectedRows = selectedRows.filter(function (el: any) {
          return el !== undefined;
        });

        selectedRows.map((record: any) => {
          let uuid = record.roles.includes("STUDENT")
            ? record.studentUserTypeUuid
            : record.customerAdminUserTypeUuid;

          if (!uuid) {
            uuid = record.userTypeUuid;
          }

          if (!selectedUsers.includes(uuid)) {
            selectedUsers.push(uuid);
          }
          return selectedUsers;
        });

        setCustomRowSelection({
          filter: [],
          selectedAllUsers: false,
          selectedUsers: selectedUsers,
          deSelectedUsers: [],
          searchText: customRowSelection.searchText,
        });

        if (selectAll) {
          setSelectedRowsLength(selectedRowsLength + selectedRows.length);
        } else {
          setSelectedRowsLength(selectedRows.length);
        }
      } else {
        let selectedUsers = customRowSelection.selectedUsers;
        changeRows.map((record: any) => {
          let uuid = record.roles.includes("STUDENT")
            ? record.studentUserTypeUuid
            : record.customerAdminUserTypeUuid;

          if (!uuid) {
            uuid = record.userTypeUuid;
          }

          if (selectedUsers.includes(uuid)) {
            let index = selectedUsers.indexOf(uuid);
            selectedUsers.splice(index, 1);
          }
          return selectedUsers;
        });

        setCustomRowSelection({
          filter: [],
          selectedAllUsers: false,
          selectedUsers: selectedUsers,
          deSelectedUsers: [],
          searchText: customRowSelection.searchText,
        });

        if (selectAll) {
          setSelectedRowsLength(selectedRowsLength - changeRows.length);
        } else {
          setSelectedRowsLength(selectedRows.length);
        }
      }
      setSelectedData(selectedRows);
    },
    onSelect: (record: any, selected: any) => {
      // selecting table row
      if (selected === true) {
        let newList = [...selectedData, record];

        setSelectedData(newList);
        setSelectedRowsLength(selectedRowsLength + 1);

        // all selection
        let selectedUsers = customRowSelection.selectedUsers;

        let uuid = record.roles.includes("STUDENT")
          ? record.studentUserTypeUuid
          : record.customerAdminUserTypeUuid;

        if (!uuid) {
          uuid = record.userTypeUuid;
        }

        selectedUsers.push(uuid);

        setCustomRowSelection({
          filter: [],
          selectedAllUsers: false,
          selectedUsers: selectedUsers,
          deSelectedUsers: [],
          searchText: customRowSelection.searchText,
        });

        // deselecting table row
      } else {
        let newList = selectedData.filter((item: any) => item.id !== record.id);

        setSelectedData(newList);

        if (selectedRowsLength !== 0) {
          setSelectedRowsLength(selectedRowsLength - 1);
        }

        // all selection
        if (selectAll) {
          let deSelectedUsers = customRowSelection.deSelectedUsers;

          let uuid = record.roles.includes("STUDENT")
            ? record.studentUserTypeUuid
            : record.customerAdminUserTypeUuid;

          if (!uuid) {
            uuid = record.userTypeUuid;
          }

          deSelectedUsers.push(uuid);

          setCustomRowSelection({
            filter: customRowSelection.filter,
            selectedAllUsers: true,
            selectedUsers: [],
            deSelectedUsers: deSelectedUsers,
            searchText: customRowSelection.searchText,
          });
        } else {
          let uuid = record.studentUserTypeUuid
            ? record.studentUserTypeUuid
            : record.customerAdminUserTypeUuid;

          if (!uuid) {
            uuid = record.userTypeUuid;
          }

          let selectedUsers = customRowSelection.selectedUsers.filter(
            (item: any) => item !== uuid
          );

          setCustomRowSelection({
            filter: customRowSelection.filter,
            selectedAllUsers: false,
            selectedUsers: selectedUsers,
            deSelectedUsers: [],
            searchText: customRowSelection.searchText,
          });
        }
      }
    },
  };

  return (
    <AntDTable
      locale={{
        emptyText: "asdash",
      }}
      loading={loading}
      rowSelection={hasSelection ? rowSelection : undefined}
      rowKey={
        customRowKey ? (record) => customRowKey(record) : (record) => record?.id
      }
      style={{ margin: 0, marginTop: 15 }}
      columns={columns}
      dataSource={loadedData}
      size="middle"
      scroll={{ x: 800 }}
      pagination={
        pagination == false
          ? false
          : {
              current: getCurrentPage(),
              defaultPageSize: pageSizeOptions[0],
              total: totalRecords,
              showTotal: showTotal,
              pageSizeOptions: pageSizeOptions,
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: goToPage,
              onShowSizeChange: changeSize,
              locale: {
                items_per_page: "General",
                jump_to: "Go to",
              },
            }
      }
      {...props}
    />
  );
};

export default Table;
