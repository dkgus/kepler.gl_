import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { addDataToMap } from "@kepler.gl/actions";
import KeplerGl from "@kepler.gl/components";

export default function Map() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/leighhalliday/a994915d8050e90d413515e97babd3b3/raw/a3eaaadcc784168e3845a98931780bd60afb362f/covid19.json"
        );
        const data = await response.json();
        console.log("data", data);

        dispatch(
          addDataToMap({
            datasets: {
              info: {
                label: "Fetched Data",
                id: "fetched_data",
              },
              data: data,
            },
            config: {
              version: "v1",
              config: {
                visState: {
                  layers: [
                    {
                      type: "3D",
                      config: {
                        dataId: "fetched_data",
                        columns: {
                          lat: "latitude_field",
                          lng: "longitude_field",
                        },
                        isVisible: true,
                      },
                    },
                  ],
                },
              },
            },
          })
        );
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <KeplerGl
      mapboxApiAccessToken="pk.eyJ1IjoibW9zaW84OSIsImEiOiJjbHRyYnI4b2cwOHRhMmtwN250cGhyam9xIn0.cWA7FjLYS63ZnDm5VRawug"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}
