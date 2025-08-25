import { forwardRef, useEffect, useRef, useState } from "react";
import { Form, Select, Tooltip } from "antd";
import { useMutation } from "@tanstack/react-query";
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
      reload,
      ...props
    },
    ref
  ) => {
    const [options, setOptions] = useState<DefaultOptionType[]>(manualOptions);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const { mutate, isPending } = useMutation({
      mutationKey: [params],
      mutationFn: async (params) => {
        if (!request) return [];
        return await request(params);
      },
      onSuccess: (res: any) => {
        if (res[resDataKey as string]) {
          setOptions(
            res[resDataKey].map((item: any) => ({
              value: item[valueKey],
              label: item[labelKey],
              itemObj: item,
            }))
          );
        }
      },
    });

    useEffect(() => {
      if (request) {
        mutate(params);
      }
    }, []);

    const onSearch = (value: any) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        mutate({
          [paramKey]: value,
          ...params,
        });
      }, 500);
    };

    useEffect(() => {
      if (manualOptions?.length) {
        setOptions(manualOptions);
      }
    }, [manualOptions]);

    useEffect(() => {
      if (request && reload > 0) {
        mutate(params);
      }
    }, [reload]);

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
          loading={isPending}
          filterSort={(optionA, optionB) =>
            (optionA?.label as string)
              ?.toLowerCase()
              .localeCompare((optionB?.label as string)?.toLowerCase())
          }
          options={options}
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
