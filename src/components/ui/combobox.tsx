"use client";
import React, { useState } from "react";
import {
  Combobox as HeadlessCombobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Search } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { removeDiacritics } from "@/lib/removeDiacritics";

interface LabelValue {
  label: string;
  value: string;
}

interface ComboboxProps {
  options: LabelValue[] | string[];
  placeholder?: string;
  value?: string;
  onChange?: (selected: string) => void;
}
export function Combobox({
  placeholder,
  value,
  options,
  onChange,
}: ComboboxProps) {
  const [state, setState] = useState<string | null>("");
  const query = value ?? state;

  const filteredOptions = (
    !query
      ? []
      : options.filter((option) => {
          return typeof option === "string"
            ? removeDiacritics(option)
                .toLowerCase()
                .includes(removeDiacritics(query ?? "").toLowerCase() ?? "")
            : removeDiacritics(option.label)
                .toLowerCase()
                .includes(removeDiacritics(query ?? "").toLowerCase() ?? "");
        })
  ).slice(0, 5);

  const handleSelect = (newValue: string | null) => {
    if (!value === undefined) setState(newValue);
    const option = options.find(
      (option) =>
        removeDiacritics(
          typeof option === "string" ? option : option.label,
        ).toLowerCase() === removeDiacritics(newValue ?? "").toLowerCase(),
    );

    onChange?.(typeof option === "string" ? option : (option?.value ?? ""));
  };

  const handleChange = (newValue: string) => {
    if (!value === undefined) setState(newValue);
    onChange?.(newValue);
  };

  return (
    <HeadlessCombobox value={query} onChange={handleSelect}>
      <ComboboxInput
        as={Input}
        inputClassName="capitalize"
        leftSection={<Search size={20} />}
        placeholder={placeholder}
        value={query ?? ""}
        onChange={(event) => handleChange(event.target.value)}
      />

      <ComboboxOptions anchor="bottom" className="py-2">
        <div className="grid rounded-[2px] border border-border/10 bg-input-background p-1 empty:invisible">
          {filteredOptions.map((option) => (
            <ComboboxOption
              key={typeof option === "string" ? option : option.value}
              as={Button}
              className="justify-start capitalize data-[focus]:bg-primary"
              variant="ghost"
              value={option}
            >
              {typeof option === "string" ? option : option.label}
            </ComboboxOption>
          ))}
        </div>
      </ComboboxOptions>
    </HeadlessCombobox>
  );
}
