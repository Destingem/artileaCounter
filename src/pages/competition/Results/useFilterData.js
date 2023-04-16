import { useEffect, useState } from "react";

export default function useFilterData(data, search) {
    const [filteredData, setFilteredData] = useState(data);
  
    useEffect(() => {
      const query = search.toLowerCase().trim();
      const filtered = data.filter((row) =>
        Object.values(row).some((value) => value && value.toString().toLowerCase().includes(query))
      );
      setFilteredData(filtered);
    }, [data, search]);
  
    return filteredData;
  }