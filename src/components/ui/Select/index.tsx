import { forwardRef, useEffect, useRef, useState } from "react";
import { Form, Select, Tooltip } from "antd";
import { useQuery } from "@tanstack/react-query";
import type { BaseSelectRef } from "rc-select";
import type { DefaultOptionType } from "rc-select/lib/Select";

const UniversalSelect = forwardRef<BaseSelectRef, any>(
  (
    {
      request,
      params = {},
      manualOptions,
      placeholder,
      valueKey = "value",
      labelKey = "label",
      filterFn,
      distinct,
      disabled,
      sortFn,
      isLabelArray,
      infoText,
      isCustomOption,
      onSelect,
      name,
      label,
      rules,
      paramKey,
      layout = "vertical",
      resDataKey = "",
      className = "",
      showSearch = false,
      isDefaultValue = false,
      manualDefaultValue = "",
      minWidth,
      requestQueryKey = "",
      reload,
      filteredOptionsCallback,
      ...props
    },
    ref
  ) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [options, setOptions] = useState<DefaultOptionType[]>(manualOptions);
    const [filteredOptions, setFilteredOptions] = useState<
      DefaultOptionType[] | null
    >(null);

    const { data, isFetching, refetch } = useQuery({
      queryKey: [
        "universal-select",
        requestQueryKey,
        params,
        searchValue,
        reload,
      ],
      queryFn: async () => {
        if (!request) return [];
        const res = await request({
          ...params,
          ...(searchValue ? { [paramKey]: searchValue } : {}),
        });
        return res;
      },
      enabled: !!request,
    });

    useEffect(() => {
      if (data && resDataKey && data[resDataKey]) {
        setOptions(
          data[resDataKey].map((item: any) => ({
            value: item[valueKey],
            label: item[labelKey],
            itemObj: item,
          }))
        );
      }
    }, [data]);

    useEffect(() => {
      if (manualOptions?.length) {
        setOptions(manualOptions);
      }
    }, [manualOptions]);

    useEffect(() => {
      if (filteredOptionsCallback && options) {
        const newOptions = options?.filter((option: any) => {
          return filteredOptionsCallback(option);
        });
        setFilteredOptions(newOptions);
      }
    }, [filteredOptionsCallback, options]);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const onSearch = (value: string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setSearchValue(value);
        refetch();
      }, 500);
    };

    return (
      <Form.Item
        name={name}
        layout={layout}
        label={
          infoText ? (
            <span>
              {label}
              <Tooltip title={infoText}>
                <i className="fal fa-question-circle header-item" />
              </Tooltip>
            </span>
          ) : (
            label
          )
        }
        rules={rules}
      >
        <Select
          disabled={disabled}
          onSelect={onSelect}
          allowClear
          ref={ref}
          showSearch={showSearch}
          placeholder={placeholder}
          optionFilterProp="label"
          loading={isFetching}
          filterSort={(optionA, optionB) =>
            (optionA?.label as string)
              ?.toLowerCase()
              .localeCompare((optionB?.label as string)?.toLowerCase())
          }
          options={filteredOptions ? filteredOptions : options}
          onSearch={onSearch}
          className={className}
          defaultValue={manualDefaultValue}
          style={{ minWidth }}
          {...props}
        />
      </Form.Item>
    );
  }
);

export default UniversalSelect;
