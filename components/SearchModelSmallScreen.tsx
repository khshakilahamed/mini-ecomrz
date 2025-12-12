"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BiSearch } from "react-icons/bi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { TProduct } from "@/types";
import { products } from "@/constants/product";

interface ISearchModalSmallScreenProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

const SearchModelSmallScreen = ({
  isOpen,
  onOpenChange,
}: ISearchModalSmallScreenProps) => {
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

  // Update suggestions as user types
  useEffect(() => {
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      const titleMatches = products
        .filter((product: TProduct) =>
          product.title.toLowerCase().includes(searchLower)
        )
        .map((product: TProduct) => product.title);

      const allMatches = [...new Set(titleMatches)];
      setFilteredSuggestions(allMatches.slice(0, 8));
      setShowSuggestions(allMatches.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedIndex(-1);
  }, [searchTerm]);

  // Close suggestions if clicked outside
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

  // Handle search submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term =
      selectedIndex >= 0 ? filteredSuggestions[selectedIndex] : searchTerm;
    if (!term.trim()) return;

    router.push(`/products?search=${encodeURIComponent(term)}`);
    setShowSuggestions(false);
    onOpenChange(false); // close modal
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    onOpenChange(false); // close modal
    router.push(`/products?search=${encodeURIComponent(suggestion)}`);
  };

  // Handle keyboard navigation
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
      case "Enter":
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(filteredSuggestions[selectedIndex]);
        }
        break;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>

        <div ref={wrapperRef} className="relative">
          <form onSubmit={handleSubmit}>
            {!searchTerm && (
              <Label
                htmlFor="searchBarModal"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl"
              >
                <BiSearch />
              </Label>
            )}

            <Input
              id="searchBarModal"
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
              className={`border-2 py-4 ${searchTerm ? "" : "pr-10"}`}
              autoComplete="off"
            />
          </form>

          {/* Suggestions dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-primary border border-gray-300 rounded-md shadow-lg z-50 max-h-[250px] overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 ${
                    index === selectedIndex ? "bg-gray-200" : ""
                  }`}
                >
                  <BiSearch className="text-gray-400" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModelSmallScreen;
