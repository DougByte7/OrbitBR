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

interface LabelValue {
  label: string;
  value: string;
}

interface ComboboxProps {
  placeholder?: string;
  options: LabelValue[] | string[];
  onChange?: (selected?: ComboboxProps["options"][number]) => void;
}
export function Combobox({ placeholder, options, onChange }: ComboboxProps) {
  const [query, setQuery] = useState<string | null>("");

  const filteredOptions = (
    !query
      ? []
      : options.filter((option) => {
          return typeof option === "string"
            ? option.toLowerCase().includes(query?.toLowerCase() ?? "")
            : option.label.toLowerCase().includes(query?.toLowerCase() ?? "");
        })
  ).slice(0, 5);

  const handleChange = (value: string | null) => {
    setQuery(value);
    onChange?.(
      options.find(
        (option) =>
          (typeof option === "string" ? option : option.label) === value,
      ),
    );
  };

  return (
    <HeadlessCombobox value={query} onChange={handleChange}>
      <ComboboxInput
        as={Input}
        inputClassName="capitalize"
        leftSection={<Search size={20} />}
        placeholder={placeholder}
        value={query ?? ""}
        onChange={(event) => setQuery(event.target.value)}
      />

      <ComboboxOptions anchor="bottom" className="py-2">
        <div className="bg-input-background grid rounded-[2px] border border-border/10 p-1 empty:invisible">
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
