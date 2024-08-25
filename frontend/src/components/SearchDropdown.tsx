import { SearchQuery, searchUsers } from "@/api";
import { debounce } from "@/utils/helpers";
import { useAppStore } from "@/utils/StoreProvider";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface Tag {
  label: string;
  value: string;
}

const options = ["Name", "City", "Country", "Skills"] as const;

// Extract all values as type from options
export type Option = (typeof options)[number];

const SearchDropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Option>("Name");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);

  const {
    cities,
    countries,
    skills,
    setUsers,
    toggleSearchEnabled,
    searchUsers: users,
    setLoader,
    setRefetchFn,
  } = useAppStore((state) => state);

  const offset = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { isLoading, refetch, data, isRefetching } = useQuery({
    queryKey: ["search", query, tags],
    queryFn: async () => {
      const response = await searchUsers({
        limit: 8,
        offset: shouldReplace.current ? 0 : users.length,
        searchType: selectedOption.toLowerCase()! as SearchQuery["type"],
        searchQuery:
          selectedOption === "Name" ? query : tags.map((tag) => tag.value),
      });
      return response.data;
    },
    enabled: false,
  });

  const shouldReplace = useRef(true);

  const refetchCb = useCallback(() => {
    shouldReplace.current = false;
    refetch();
  }, [users, refetch]);

  useEffect(() => {
    if (!!query || tags.length > 0) {
      shouldReplace.current = !!query || tags.length > 0;
      setRefetchFn(refetchCb);
    }
  }, [query, tags]);

  useEffect(() => {
    setLoader(isLoading || isRefetching);
  }, [isLoading, isRefetching]);

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (data?.users) {
      setUsers(data.users, {
        replace: shouldReplace.current,
      });
    }
  }, [data]);

  const debounceSearch = useCallback(debounce(refetch, 400), [refetch]);

  useEffect(() => {
    if (selectedOption === "Name" && query.length > 0) {
      offset.current = 0;
      toggleSearchEnabled(true);
      debounceSearch();
    }
  }, [query, selectedOption, debounceSearch]);

  useEffect(() => {
    if (tags.length === 0) return;
    offset.current = 0;
    toggleSearchEnabled(true);
    debounceSearch();
  }, [tags]);

  useEffect(() => {
    if (tags.length === 0 && query.length === 0) {
      toggleSearchEnabled(false);
    }
  }, [tags, query]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleTagRemove = (value: string) => {
    setTags(tags.filter((tag) => tag.value !== value));
  };

  const handleSuggestionSelect = (suggestion: string) => {
    const newTag = { label: suggestion, value: suggestion };
    if (!tags.find((tag) => tag.value === suggestion)) {
      setTags([...tags, newTag]);
    }
    setQuery("");
  };

  const filteredSuggestions = () => {
    if (selectedOption === "City")
      return cities.filter((city) =>
        city.toLowerCase().includes(query.toLowerCase())
      );
    if (selectedOption === "Country")
      return countries.filter((country) =>
        country.toLowerCase().includes(query.toLowerCase())
      );
    if (selectedOption === "Skills")
      return skills.filter((skill) =>
        skill.toLowerCase().includes(query.toLowerCase())
      );
    return [];
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="flex justify-center mt-4" ref={containerRef}>
      <div className="relative w-full max-w-2xl">
        <div className="flex items-center justify-between rounded-md w-full bg-white border border-gray-300 p-2">
          <div className="flex flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag.value}
                className="bg-blue-400 text-white text-sm rounded-full px-2 py-1 m-1 flex items-center"
              >
                {tag.label}
                <button
                  onClick={() => handleTagRemove(tag.value)}
                  className="ml-1 text-xs"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={`Search ${selectedOption.toLowerCase()}...`}
            className="flex-grow outline-none px-2 py-1"
          />
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center justify-center rounded-md px-3 py-1 bg-blue-500 text-white focus:outline-none"
          >
            {selectedOption}
            <FaChevronDown
              className={`ml-2 transition-transform duration-500 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>
        </div>
        {/* Options Dropdown */}
        {dropdownOpen && (
          <div className="absolute left-0 right-0 mt-1 rounded-md bg-white shadow-lg z-10 overflow-hidden">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleOptionSelect(option)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center border-b-2 border-gray-200 "
              >
                {option}
              </div>
            ))}
          </div>
        )}
        {/* Suggestions List */}
        {query && filteredSuggestions().length > 0 && (
          <div className="absolute left-0 right-0 mt-1 rounded-md bg-white shadow-lg z-10 overflow-hidden">
            {filteredSuggestions().map((suggestion) => (
              <div
                key={suggestion}
                onClick={() => handleSuggestionSelect(suggestion)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 border-b-2 border-gray-200 "
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;
