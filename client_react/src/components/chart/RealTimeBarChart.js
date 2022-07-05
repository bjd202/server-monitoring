import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";

function RealTimeBarChart({type}) {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const interval = useRef(null)

  // let failCount = 0

  useEffect(() => {
    // const interval = setInterval(() => {
    interval.current = setInterval(() => {
      let url = "";

      switch (type) {
        case "cpu":
          url = "/cpuload/findCpuLoadTop5";
          break;
        case "memory":
          url = "/memory/findMemoryUsedTop5";
          break;
        case "disk":
          url = "/disk/findDiskUseTop5";
          break;

        default:
          break;
      }

      axios
        .get(`http://localhost:4000${url}`)
        .then((res) => {
          let categories = [];
          let data = [];

          for (let i = 0; i < res.data.length; i++) {
            categories.push(res.data[i].hostname);
            data.push(res.data[i].data);
          }

          console.log(categories);
          console.log(data);

          setCategories(categories);
          setData(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 2000);

    return () => {
      clearInterval(interval.current); // clear the interval in the cleanup function
    };
  }, [type]);

  const options = {
    options: {
      chart: {
        id: "basic-bar",
        toolbar: { show: false },
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        min: 0,
        max: 100,
      },
      colors: ["#6E5192"],
      tooltip: {
        enabled: true,
      },
    },
    series: [
      {
        name: "series-1",
        data: data,
      },
    ],
  };

  return (
    <Chart options={options.options} series={options.series} type="bar" />
  );
}

export default RealTimeBarChart;
