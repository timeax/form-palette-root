import React from "react";

export type TreeKey = string | number;
export type TreeValue = TreeKey | TreeKey[] | undefined;

export type TreeSelectOption =
    | TreeKey
    | {
          label?: React.ReactNode;
          value?: TreeKey;
          description?: React.ReactNode;
          disabled?: boolean;
          icon?: React.ReactNode;
          children?: TreeSelectOption[];
          [key: string]: any;
      };

export type NormalizedTreeItem = {
    key: string;
    value: TreeKey;
    labelNode: React.ReactNode;
    labelText: string;
    description?: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    tags?: Array<{
        label: React.ReactNode;
        icon?: React.ReactNode;
        className?: string;
        color?: string;
        bgColor?: string;
        onClick?: React.MouseEventHandler<HTMLSpanElement>;
        raw: unknown;
    }>;
    level: number;
    parentValue?: TreeKey;
    path: TreeKey[]; // ancestors only (not including self)
    hasChildren: boolean;
    children: NormalizedTreeItem[];
    raw: TreeSelectOption;
};
