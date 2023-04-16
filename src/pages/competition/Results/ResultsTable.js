import React, { useState, useEffect } from "react";
import {
  Table,
  Collapse,
  TextInput,
  Button,
  UnstyledButton,
  Group,
  Text,
  Center,
  createStyles,
  rem,
  ActionIcon,
} from "@mantine/core";
import { Paper } from "@mui/material";
import { IconChevronUp, IconSearch, IconSelector } from "@tabler/icons-react";
import { IconChevronDown } from "@tabler/icons-react";
import useFilterData from "./useFilterData";
import Th from "./Th";
import {BsArrowUpShort, BsArrowDownShort} from "react-icons/bs";


function useSortData(data, sortBy, reverseSortDirection) {
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    if (!sortBy) {
      setSortedData(data);
      return;
    }

    const sorted = [...data].sort((a, b) => {
      if (reverseSortDirection) {
        return b[sortBy]?.toString().localeCompare(a[sortBy]?.toString());
      }
      return a[sortBy]?.toString().localeCompare(b[sortBy]?.toString());
    });

    setSortedData(sorted);
  }, [data, sortBy, reverseSortDirection]);

  return sortedData;
}



function ResultsTable({ data }) {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const filteredData = useFilterData(rows, search);
  const sortedData = useSortData(filteredData, sortBy, reverseSortDirection);

  useEffect(() => {
    const rowData = [];

    data[0]?.shifts.forEach((element) => {
 
      element.shootingSessions.forEach((el) => {
      
        let row = {
          place: el.place,
          name: el?.shooter?.fname + " " + el?.shooter?.lname,
          shift: element.shiftNumber,
          discipline: el?.discipline?.name ? el?.discipline?.name : "",
          dateOfBirth: el?.shooter?.dateOfBirth,
          inputs: !el?.shootingSessions?.results ? Array.from({ length: el?.discipline?.shots?.competitionShots }, () => 0) : Array.from(el.shootingSessions.results),

          isCollapsed: false,
          shootingSessionID: el?.shootingSessions?._id,
          competitionID: data[0]?._id,
        };
        rowData.push(row);
      });
    });

    setRows(rowData);
  }, [data]);

  const handleInputChange = async (rowIndex, inputIndex, value) => {
    var newRows = [...rows];
   if( 0 > value || value > 10.9){
      return;
   }
    newRows[rowIndex].inputs[inputIndex] = parseFloat(value) || 0;

    const info = newRows[rowIndex]
    var {competitionID, shootingSessionID, inputs: data} = info;


   if(competitionID && shootingSessionID && data){
    var result = JSON.parse(await window.api.compitition.editResult({competitionID, shootingSessionID, data}));
   
   }
    if(result.err == false){
      setRows(newRows);
    }
  };

  const addInput = (index) => {
    const newRows = [...rows];
    newRows[index].inputs.push(0);
    setRows(newRows);
  };

  const toggleCollapsible = (index) => {
    const newRows = [...rows];
    newRows[index].isCollapsed = !newRows[index].isCollapsed;
    setRows(newRows);
  };

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  return (
    <Paper>
      <div style={{ padding: "1rem" }}>
        <h3>VzP40</h3>
        {/* Add search TextInput */}
        <TextInput
          placeholder="Vyhledávání"
          mb="md"
          icon={<IconSearch size="0.9rem" stroke={1.5} />}
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
        <Table>
          <thead>
            <tr>
              {/* Add Th components for sorting */}
              <Th
                sorted={sortBy === "place"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("place")}
              >
                Place
              </Th>
              <Th
                sorted={sortBy === "shift"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("shift")}
              >
                Shift
              </Th>
              <Th
                sorted={sortBy === "name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")}
              >
                Jméno
              </Th>
              <Th
                sorted={sortBy === "discipline"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("discipline")}
              >
                Discilína
              </Th>
              <Th
                sorted={sortBy === "dateOfBirth"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("dateOfBirth")}
              >
                Datum narození
              </Th>
              <th>Result</th>
              <th>CT</th>
              <th align="center" style={{align: "center", textAlign: "center"}} >Zapsat rány</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => {
              const result = row.inputs.reduce((acc, cur) => acc + cur, 0);
              const ct = row.inputs.filter((val) => val > 10.2).length;

              return (
                <React.Fragment key={rowIndex}>
                  <tr>
                    <td>{row.place}</td>
                    <td>{row.shift}</td>
                    <td>{row.name}</td>
                    <td>{row.discipline}</td>
                    <td>{row.dateOfBirth}</td>
                    <td>{result}</td>
                    <td>{ct}</td>
                    <td style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <ActionIcon color="blue" radius="xl" variant="filled" onClick={() => toggleCollapsible(rowIndex)}>
                        {row.isCollapsed ? <BsArrowUpShort size={"2rem"} /> : <BsArrowDownShort size={"2rem"} />}
                      </ActionIcon>
                    </td>
                  </tr>
                  {row.isCollapsed && (
                    <tr>
                      <td colSpan={7}>
                      <Collapse in={row.isCollapsed}>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gridGap: "1rem" }}>
                            {row.inputs.map((inputValue, inputIndex) => (
                              <TextInput
                              min={0}
                              max={10.9}
                                key={inputIndex}
                                type="number"
                                
                                placeholder={`Input ${inputIndex + 1}`}
                                value={inputValue}
                                onChange={(event) =>
                                  handleInputChange(rowIndex, inputIndex, event.currentTarget.value)
                                }
                              />
                            ))}
                          </div>
                          <div style={{ marginTop: "1rem" }}>
                            <Button onClick={() => addInput(rowIndex)}>Add Input</Button>
                          </div>
                        </Collapse>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Paper>
  );
}

export default ResultsTable;


