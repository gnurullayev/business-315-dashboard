import type { Rule } from "antd/es/form";

export type FilterField =
  | {
      type: "input";
      name: string;
      placeholder?: string;
      label?: string;
      required?: boolean;
      rules?: Rule[];
    }
  | {
      type: "date";
      name: string;
      placeholder?: string;
      label?: string;
      required?: boolean;
      rules?: Rule[];
    }
  | {
      type: "daterange";
      name: string;
      placeholder?: string;
      label?: string;
      required?: boolean;
      rules?: Rule[];
    }
  | {
      type: "select";
      name: string;
      placeholder?: string;
      options?: { label: string; value: string | number }[];
      label?: string;
      required?: boolean;
      params?: any;
      request?: any;
      paramKey?: string;
      resDataKey?: string;
      valueKey?: string;
      labelKey?: string;
      showSearch?: boolean;
      rules?: Rule[];
    };
