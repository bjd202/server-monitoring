import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

let thead = [];

function RealTimeTable(props) {
  const { type } = props;
  const [data, setData] = useState([]);

  let url = "";
  switch (type) {
    case "cpu":
      thead = ["Name", "CPU(%)", "CPU User(%)", "CPU System(%)", "Hostname"];
      url = "/process/findProcessCpuTop5";
      break;

    case "memory":
      thead = ["Name", "Memory(%)", "Hostname"];
      url = "/process/findProcessMemoryTop5";
      break;

    default:
      break;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`http://localhost:4000${url}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 1000 * 60 * 5);

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return (
    <Table responsive hover size="">
      <thead>
        <tr>
          {thead.map((value, index) => {
            return (
              <th key={index} style={{ whiteSpace: "nowrap" }}>
                {value}
              </th>
            );
          })}
          {/* {Array.from({ length: 12 }).map((_, index) => (
            <th key={index}>Table heading</th>
          ))} */}
        </tr>
      </thead>
      <tbody>
        {type === "cpu"
          ? data.map((value, i) => {
              return (
                <tr key={i}>
                  <td style={{ whiteSpace: "nowrap" }}>{value.name}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{value.cpu}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{value.cpuu}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{value.cpus}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{value.hostname}</td>
                </tr>
              );
            })
          : data.map((value, i) => {
              return (
                <tr key={i}>
                  <td style={{ whiteSpace: "nowrap" }}>{value.name}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{value.mem}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{value.hostname}</td>
                </tr>
              );
            })}
      </tbody>
    </Table>
  );
}

export default RealTimeTable;
