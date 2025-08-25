import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Space } from "antd";
import type { FormInstance } from "antd/es/form";
import "./styles.scss";
import type { FilterField } from "./type";
import { useTranslation } from "react-i18next";
import UniversalSelect from "../ui/Select";

const { RangePicker } = DatePicker;

interface FilterProps {
  fields: FilterField[];
  onFilter: (values: Record<string, any>) => void;
  extraButton?: React.ReactNode;
  form?: FormInstance;
}

const Filter: React.FC<FilterProps> = ({
  fields,
  onFilter,
  extraButton,
  form,
}) => {
  const [formInstance] = Form.useForm(form);
  const [activeFilter, setActiveFilter] = useState(true);
  const { t } = useTranslation();

  const onFieldsChange = () => {
    const values = formInstance.getFieldsValue();
    onFilter(values);
  };

  const handleReset = () => {
    formInstance.resetFields();
    onFilter({});
  };
  const handleFilter = () => {
    formInstance.resetFields();
    setActiveFilter((prev) => !prev);
    onFilter({});
  };

  return (
    <Form
      form={formInstance}
      className="filter"
      onFieldsChange={onFieldsChange}
    >
      <Space className="filter_controls">
        <Button
          type="primary"
          onClick={handleFilter}
          className={activeFilter ? "filter_active_btn" : ""}
        >
          {t("filter.filter")}
        </Button>
        <Button onClick={handleReset}>{t("filter.clearFilter")}</Button>
      </Space>

      <div className="filter_items">
        {activeFilter &&
          fields.map((field, index) => {
            switch (field.type) {
              case "input":
                return (
                  <Form.Item
                    name={field.name}
                    key={index}
                    label={field.label}
                    layout="vertical"
                    required={field.required}
                    rules={field.rules}
                  >
                    <Input placeholder={field.placeholder} allowClear />
                  </Form.Item>
                );

              case "date":
                return (
                  <Form.Item
                    name={field.name}
                    key={index}
                    label={field.label}
                    layout="vertical"
                    required={field.required}
                    rules={field.rules}
                  >
                    <DatePicker
                      format="MM/DD/YYYY"
                      placeholder={field.placeholder}
                    />
                  </Form.Item>
                );

              case "daterange":
                return (
                  <Form.Item
                    name={field.name}
                    key={index}
                    label={field.label}
                    layout="vertical"
                    required={field.required}
                    rules={field.rules}
                  >
                    <RangePicker />
                  </Form.Item>
                );
              case "select":
                return (
                  <UniversalSelect
                    name={field.name}
                    key={index}
                    label={field.label}
                    layout="vertical"
                    placeholder={field.placeholder}
                    required={field.required}
                    manualOptions={field.options}
                    params={field.params}
                    request={field.request}
                    paramKey={field.paramKey}
                    resDataKey={field.resDataKey}
                    valueKey={field.valueKey}
                    labelKey={field.labelKey}
                    rules={field.rules}
                    showSearch={field.showSearch}
                  />
                );

              default:
                return null;
            }
          })}
      </div>

      <div className="filter_footer">{extraButton}</div>
    </Form>
  );
};

export default Filter;
