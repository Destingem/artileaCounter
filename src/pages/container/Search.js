import { Kbd, Select } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function Search(){
    const searchRef = React.useRef(null);
  useHotkeys([['ctrl+F', () => {searchRef.current.focus(); searchRef.current.click(); console.log(searchRef)}],])
    return(
        <div  >
        <Select
        size="md"
        style={{ justifyItems: "center",  width: "30vw", minWidth: "30vw",}}
        ref={searchRef}
        searchable
        placeholder="Vyhledat..."
        icon={<AiOutlineSearch />}
        rightSection={<div style={{display: "flex", marginLeft: "-80px"}}><Kbd>Ctrl</Kbd>  + <Kbd>F</Kbd></div>}
        nothingFound="No options"
        data={["A"]}
      />
        </div>
    )
}   