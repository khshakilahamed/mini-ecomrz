"use client";

import type React from "react";

import { BiSearch } from "react-icons/bi";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { type FormEvent, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TProduct } from "@/types";
import { products } from "@/constants/product";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Initialize search term from URL on first render
  useEffect(() => {
    const search = searchParams.get("search") || "";
    setSearchTerm(search);
  }, [searchParams]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();

      const titleMatches = products
        .filter((product: TProduct) =>
          product.title.toLowerCase().includes(searchLower)
        )
        .map((product: TProduct) => product.title);

      const allMatches = [...new Set([...titleMatches])];

      setFilteredSuggestions(allMatches.slice(0, 8));
      setShowSuggestions(allMatches.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedIndex(-1);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const term =
      selectedIndex >= 0 ? filteredSuggestions[selectedIndex] : searchTerm;

    router.push(`/products?search=${encodeURIComponent(term)}`);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    router.push(`/products?search=${encodeURIComponent(suggestion)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div ref={wrapperRef} className="hidden sm:flex flex-1 relative">
      <form onSubmit={handleSubmit} className="flex flex-1 relative">
        {!searchTerm && (
          <Label
            htmlFor="searchBar"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl"
          >
            <BiSearch />
          </Label>
        )}

        <Input
          id="searchBar"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (searchTerm.trim() && filteredSuggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder="Search here..."
          className={`border-2 py-5 ${searchTerm ? "" : "pr-10"}`}
          autoComplete="off"
        />
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-primary border-2 border-border rounded-md shadow-lg z-50 max-h-[300px] overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full text-left px-4 py-3 hover:bg-accent transition-colors flex items-center gap-2 ${
                index === selectedIndex ? "bg-accent" : ""
              }`}
            >
              <BiSearch className="text-muted-foreground" />
              <span className="text-foreground">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
