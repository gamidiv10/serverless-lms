

import WordCloud from "react-d3-cloud";
import React, { useState } from 'react';

export const WordCloudGenerate = () => {
    let [dataSource,setDataSource]  = useState([]);


        let loading =  true;

    const data = [
        { text: "Hey", value: 1000 },
        { text: "lol", value: 200 },
        { text: "first impression", value: 800 },
        { text: "very cool", value: 1000000 },
        { text: "very hot", value: 2000000 },
        { text: "duck", value: 10 }
    ];


    fetch("https://wordclouddatafeed-oeueo7ct2a-uc.a.run.app")
        .then(response => response.json())
        .then((responseJson) => {
            console.log('getting data from fetch', responseJson)

            setTimeout(() => {

                loading = false;
                setDataSource(dataSource=responseJson);
            }, 2000)

        })
        .catch(error => console.log(error))
    //console.log('data',dataSource)


    var dataSourceJSONFormat1 = [];
    dataSource.forEach(myFunction);

    function myFunction(value, index, array) {
        var object = {};
        object.text = array[index][0];
        object.value =  array[index][1];

        dataSourceJSONFormat1.push(object);

    }
   // console.log(dataSourceJSONFormat);
    console.log(dataSourceJSONFormat1);
    const fontSizeMapper = word => Math.log2(word.value*10) * 5;
    const rotate = word => word.value*10 % 360;
    return (<WordCloud data={dataSourceJSONFormat1} fontSizeMapper={fontSizeMapper} rotate={rotate} />
         );


}


