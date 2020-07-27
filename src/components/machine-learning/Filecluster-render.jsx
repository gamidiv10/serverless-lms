import { Graph }  from "react-d3-graph";
import React, {useEffect, useState} from 'react';
import {render} from "react-dom";
export const ClusterRender = () => {
    let [JSONData,setJSONDataSource]  = useState();
// graph payload (with minimalist structure)
    const data = {
        nodes: [{id: "01"}, {id: "02"}, {id: "03"},{id:"001.txt"},{id:"002.txt"}],
        links: [
            {source: "001.txt", target: "01"},
            {source: "002.txt", target: "01"},
        ],
    };

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: "orange",
            size: 320,
            highlightStrokeColor: "red",
            fontSize:20,
            fontColor:"red"
        },
        link: {
            highlightColor: "lightblue",
        },
    };
    useEffect(()=> {
        fetch("https://machine-learning-module-image-g665j7md3q-uc.a.run.app")
            .then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from fetch', responseJson)
                setJSONDataSource(responseJson);
            })
            .catch(error => console.log(error));
    }, []);

  return(
        JSONData
            ?  <Graph
            id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
            data={JSONData}
            config={myConfig}
             />
             : null
        )


};
