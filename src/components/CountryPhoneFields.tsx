"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Phone, Globe, ChevronDown } from "lucide-react";
import { countries, findCountryByCode, applyPhoneMask, getDialDigits } from "@/lib/countries";
import type { Country } from "@/lib/countries";

/** Convert ISO 3166-1 alpha-2 code to flag emoji (e.g. "US" → 🇺🇸) */
function countryFlag(code: string) {
  return [...code.toUpperCase()].map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)).join("");
}

interface CountryPhoneFieldsProps {
  country: string; // country code e.g. "PK"
  phone: string;
  onChange: (countryCode: string, phone: string) => void;
  inputClass?: string;
  iconClass?: string;
  required?: boolean;
}

export default function CountryPhoneFields({
  country,
  phone,
  onChange,
  inputClass = "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm",
  iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-primary-400",
  required = true,
}: CountryPhoneFieldsProps) {
  const selectedCountry = findCountryByCode(country);

  return (
    <>
      <CountrySelect
        value={country}
        onChange={(code) => {
          const newCountry = findCountryByCode(code);
          // Set both country and dial code in one update
          onChange(code, newCountry?.dial || "");
        }}
        inputClass={inputClass}
        iconClass={iconClass}
        required={required}
      />
      <PhoneInput
        value={phone}
        onChange={(val) => onChange(country, val)}
        mask={selectedCountry?.mask}
        inputClass={inputClass}
        iconClass={iconClass}
        required={required}
      />
    </>
  );
}

/* ── Country Select ── */

interface CountrySelectProps {
  value: string;
  onChange: (code: string) => void;
  inputClass?: string;
  iconClass?: string;
  required?: boolean;
}

function CountrySelect({
  value,
  onChange,
  inputClass = "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm",
  iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-primary-400",
  required = true,
}: CountrySelectProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = findCountryByCode(value);

  const filtered = useMemo(() => {
    if (!search) return countries;
    const lower = search.toLowerCase();
    return countries.filter(
      (c) => c.name.toLowerCase().includes(lower) || c.dial.includes(search)
    );
  }, [search]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (c: Country) => {
    onChange(c.code);
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="relative" ref={ref}>
      {selected ? (
        <span className={`${iconClass} text-base leading-none`}>{countryFlag(selected.code)}</span>
      ) : (
        <Globe size={18} className={iconClass} />
      )}
      <input
        ref={inputRef}
        type="text"
        value={open ? search : selected?.name || ""}
        onChange={(e) => {
          setSearch(e.target.value);
          if (!open) setOpen(true);
        }}
        onFocus={() => {
          setOpen(true);
          setSearch("");
        }}
        placeholder="Select country"
        required={required}
        autoComplete="off"
        className={`${inputClass} pr-10 cursor-pointer`}
        readOnly={false}
      />
      <ChevronDown
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />

      {open && (
        <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-400">
              No countries found
            </div>
          ) : (
            filtered.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => handleSelect(c)}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary-50 transition flex items-center justify-between ${
                  c.code === value
                    ? "bg-primary-50 text-primary-700 font-medium"
                    : "text-gray-700"
                }`}
              >
                <span>{countryFlag(c.code)} {c.name}</span>
                <span className="text-gray-400 text-xs">{c.dial}</span>
              </button>
            ))
          )}
        </div>
      )}

      {/* Hidden input for form validation */}
      {required && !value && (
        <input
          type="text"
          required
          value=""
          onChange={() => {}}
          className="sr-only"
          tabIndex={-1}
        />
      )}
    </div>
  );
}

/* ── Phone Input with Mask ── */

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  mask?: string;
  inputClass?: string;
  iconClass?: string;
  required?: boolean;
}

function PhoneInput({
  value,
  onChange,
  mask,
  inputClass = "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm",
  iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-primary-400",
  required = true,
}: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (mask) {
      const masked = applyPhoneMask(raw, mask);
      onChange(masked);
    } else {
      // Basic: only allow digits, +, spaces, (, ), -
      const cleaned = raw.replace(/[^\d+\s()-]/g, "");
      onChange(cleaned);
    }
  };

  const dialDigitCount = mask ? getDialDigits(mask).length : 0;
  const currentDigits = value.replace(/\D/g, "").length;
  const hasEnoughDigits = currentDigits > dialDigitCount;

  return (
    <div className="relative">
      <Phone size={18} className={iconClass} />
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        required={required}
        placeholder={mask || "+XX XXX XXXXXXX"}
        className={inputClass}
      />
      {required && (
        <input
          type="text"
          required={!hasEnoughDigits}
          value={hasEnoughDigits ? "valid" : ""}
          onChange={() => {}}
          className="sr-only"
          tabIndex={-1}
        />
      )}
    </div>
  );
}
