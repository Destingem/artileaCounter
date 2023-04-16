import { Avatar, Group, Kbd, Select, Text, ThemeIcon } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import React, { forwardRef, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

export default function Search({redirect, setRedirection}) {
  const [data, setData] = useState([]);
  const searchRef = React.useRef(null);
  const navigate = useNavigate();


  useHotkeys([
    [
      "ctrl+F",
      () => {
        searchRef.current.focus();
        searchRef.current.click();
        console.log(searchRef);
      },
    ],
  ]);



 async function handleChange(e){
  setData([]);
     let searched = e;
     console.log(e);
     let result = JSON.parse(await window.api.searching.search(searched));
     console.log(result);
      result = result.map((item) => {
      return {
        label: item.title,
        value: item.id,
        description: item.content,
        href: item.href,
        category: item.category,
      };
      });
     console.log(result);
     setData(result);
    }
    const Dropdown = forwardRef(({ children, ...others }, ref) => (
      <div ref={ref} {...others}>
        <Group position="center" style={{ padding: "10px 20px" }}>
          <Text size="sm" weight={700}>
            Výsledky
          </Text>
        </Group>
        {children}
      </div>
    ));
    
    const SelectItem = forwardRef(
      ({ category, href, label, description, link, ...others }, ref) => {
        others = {...others, onMouseDown: ()=> {setRedirection(href)}}
        return(
       
          <div
           href={href}
           
           onMouseDown={()=> {setRedirection(href)}}
          {...others}
            sx={{zIndex: "1000"}}
           
          >
           {console.log(others)}
             <div   onClick={()=> {setRedirection(href)}} to={href} ref={ref} style={{display: "flex", alignItems: "center", justifyContent: "space-between"}} >
            <Group noWrap >
            <ThemeIcon radius="xl"> <Text weight={700}>{category.slice(0, 1)}</Text></ThemeIcon>
  
              <div>
                <Text   onClick={()=> {setRedirection(href)}} size="sm">{label}</Text>
                <Text size="xs" opacity={0.65}>
                  {description}
                </Text>
              </div>
            </Group>
            <Text>{category}</Text>
            </div>
          </div>
        )
      }
    );

    
    return(
        <div>
        <Select

        
        
       onSearchChange={handleChange}
        size="md"
        style={{ justifyItems: "center",  width: "30vw", minWidth: "30vw",}}
        ref={searchRef}
        searchable
        dropdownComponent={Dropdown}
        itemComponent={SelectItem}
        placeholder="Vyhledat..."
        icon={<AiOutlineSearch />}
        rightSection={<div style={{display: "flex", marginLeft: "-80px"}}><Kbd>Ctrl</Kbd>  + <Kbd>F</Kbd></div>}
        nothingFound="Nebyly nalezeny žádné výsledky"
        data={data}
        clearable
        
        
       
        maxDropdownHeight={1002}
        filter={(value, item) =>
        item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
      />

    
        </div>
    )
}   