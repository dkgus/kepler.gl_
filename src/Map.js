import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { addDataToMap } from "@kepler.gl/actions";
import KeplerGl from "@kepler.gl/components";

export default function Map() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("your data set");
        const data = await response.json();

        dispatch(
          addDataToMap({
            datasets: {
              info: {
                label: "caregivers",
                id: "caregivers",
              },
              data,
            },
            options: {
              centerMap: true,
              readOnly: true,
            },
            config: {},
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
      id="caregiver"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}
