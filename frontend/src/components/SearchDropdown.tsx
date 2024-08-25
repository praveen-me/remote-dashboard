import { SearchQuery, searchUsers } from "@/api";
import { debounce } from "@/utils/helpers";
import { useAppStore } from "@/utils/StoreProvider";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface Tag {
  label: string;
  value: string;
}

const options = ["Name", "Cities", "Countries", "Skills"] as const;

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

  const { isLoading, refetch, data } = useQuery({
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
    setLoader(isLoading);
  }, [isLoading]);

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (data?.users) {
      console.log("replace", shouldReplace.current);
      setUsers(data.users, {
        replace: shouldReplace.current,
      });
    }
  }, [data]);

  const debounceSearch = useCallback(debounce(refetch, 400), [selectedOption]);

  useEffect(() => {
    if ((selectedOption === "Name" && query) || tags.length > 0) {
      offset.current = 0;
      toggleSearchEnabled(true);
      debounceSearch();
    } else {
      toggleSearchEnabled(false);
    }
  }, [query, selectedOption, tags]);

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
    if (selectedOption === "Cities")
      return cities.filter((city) =>
        city.toLowerCase().includes(query.toLowerCase())
      );
    if (selectedOption === "Countries")
      return countries.filter((country) =>
        country.toLowerCase().includes(query.toLowerCase())
      );
    if (selectedOption === "Skills")
      return skills.filter((skill) =>
        skill.toLowerCase().includes(query.toLowerCase())
      );
    return [];
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-between rounded-md w-[70%] h-auto bg-white h-10">
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
                x
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={`Search ${selectedOption.toLowerCase()}...`}
          className="outline-none min-w-[50%] p-2"
        />
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="rounded-r-md w-32 text-center bg-blue-500 text-white font-bold"
        >
          {selectedOption}
        </button>
      </div>

      {dropdownOpen && (
        <div className="absolute mt-2 w-[20%] rounded-md bg-white shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionSelect(option)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {option}
            </div>
          ))}
        </div>
      )}

      {query && filteredSuggestions().length > 0 && (
        <div className="absolute mt-10 w-[47.5%] rounded-md bg-white shadow-lg z-10 left-[21.9rem]">
          {filteredSuggestions().map((suggestion) => (
            <div
              key={suggestion}
              onClick={() => handleSuggestionSelect(suggestion)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
