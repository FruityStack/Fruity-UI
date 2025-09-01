import deepmerge from "deepmerge";
import { ComponentConfig, Theme } from "../types";
import React from 'react';

const arrayMerge: deepmerge.Options["arrayMerge"] = (_dest, source) => source;

const getMergedStyles = <
  TStyles extends Record<string, any>,
  TVariant extends string = string,
  TKey extends keyof NonNullable<Theme["components"]> = keyof NonNullable<Theme["components"]>
>(
  theme: Theme,
  componentKey: TKey,
  baseStyles: TStyles,
  variant?: TVariant,
  customStyle?: Partial<TStyles>
): TStyles => {
  console.log(React.version);
  const comp = theme.components?.[componentKey] as ComponentConfig<TStyles, TVariant> | undefined;

  const fromBase = comp?.base ?? {};
  const fromVariant = (variant && comp?.variants?.[variant]) ?? {};

  return deepmerge.all<TStyles>([baseStyles, fromBase, fromVariant, (customStyle ?? {}) as TStyles], { arrayMerge });
};

export default getMergedStyles;