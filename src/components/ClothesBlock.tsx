import React, { Fragment, memo } from "react";

import { min } from "../service/utils.js"
import ClothesFaceout from "./ClothesFaceout";
import { Clothes, TOPS, BOTTOMS, COMFORT, UNLAYERABLE_TOP_INDICIES } from "./constants";

import "../styles/clothes.css"

type ClothesBlockProps = {
    highTemperature: number;
    lowTemperature: number;
    feelsLikeTemperature: number;
    suggestionTrigger: boolean;
};

const ClothesBlock = memo(({highTemperature, lowTemperature, feelsLikeTemperature} : ClothesBlockProps) => {
    const getTops = () => {
        if (min(feelsLikeTemperature, lowTemperature) > 74 || highTemperature > 88) {
            return TOPS[0];
        }

        const difference = COMFORT - min(feelsLikeTemperature, lowTemperature); 
        const differences = [difference, difference - 5, difference + 5];

        // Map the result for each difference in a single loop
        return differences.map(diff => getOptions(diff).map(index => TOPS[index]));
    };
    
    const getLayers = (temperatureDifference) => {
        const possibleLayers: number[][] = [];
    
        const backtrack = (startIdx: number, currentIndices: number[], currentSum: number) => {
            if (Math.abs(currentSum - temperatureDifference) <= 2) {
                possibleLayers.push([...currentIndices]);
            }

            for (let i = startIdx; i < TOPS.length; i++) {
                backtrack(i + 1, [...currentIndices, i], currentSum + TOPS[i].warmth)
            }
        }

        backtrack(0, [], 0);
        return possibleLayers[Math.floor(Math.random() * possibleLayers.length)]
    };
    
    const getOptions = (temperatureDifference) => {
        let options = getLayers(temperatureDifference);
    
        // Handle unlayerable items logic
        const unlayerableItems = options.filter(num => UNLAYERABLE_TOP_INDICIES.includes(num));
    
        if (unlayerableItems.length > 1) {
            const heaviestTop = Math.max(...unlayerableItems);
            options = options.filter(num =>
                num < UNLAYERABLE_TOP_INDICIES[0] || num > UNLAYERABLE_TOP_INDICIES.slice(-1)[0] || num === heaviestTop
            );
    
            // Add back a hoodie (layerable)
            options.push(3)
        }
    
        // Ensure short sleeve shirt is included if only a jacket or coat is selected
        if (options[0] > 2) {
            options.unshift(0);
        }

        // Cannot have short sleeve + long sleeve shirt together
        if (options[0] === 0 && options[1] === 1) {
            options.shift();
        }
    
        options = options.filter((value, index, self) => self.indexOf(value) === index).sort(); // Remove duplicates and sort
        return options;
    };

    const getBottoms = () => {
        if (min(feelsLikeTemperature, lowTemperature) > 68 || highTemperature > 78) {
            return BOTTOMS[0];
        }

        const difference = COMFORT - min(feelsLikeTemperature, lowTemperature); 
        const differences = [difference, difference - 5, difference + 5];

        const getBottoms = (temperatureDifference) => {
            if (temperatureDifference < 10) return BOTTOMS[0];
            if (temperatureDifference < 33) return BOTTOMS[1];
            return BOTTOMS[2];
        }

        return differences.map((diff) => getBottoms(diff));
    }


    const topOptions = getTops();
    const bottomOptions = getBottoms();

    const topOptionsPanel = 
        <div className="clothes-container">
            <span>Suggested: </span>{" "}
            {topOptions[0].map(
                (clothes: Clothes, idx: number) => (
                    <Fragment key={idx}>
                        <ClothesFaceout name={clothes.name} warmth={clothes.warmth}/>
                        {" + "}
                    </Fragment>
                ))}
            <ClothesFaceout name={bottomOptions[0].name} warmth={bottomOptions[0].warmth} />
        </div>;

    const topOptionsPanelCool = JSON.stringify(topOptions[1]) !== JSON.stringify(topOptions[0]) ? 
        <div className="clothes-container">
            <span>Something Cooler: </span>{" "}
            {topOptions[1].map(
                (clothes: Clothes, idx: number) => (
                    <Fragment key={idx}>
                        <ClothesFaceout name={clothes.name} warmth={clothes.warmth}/>
                        {" + "}
                    </Fragment>
                ))}
            <ClothesFaceout name={bottomOptions[1].name} warmth={bottomOptions[1].warmth} />
        </div>
        : null;

    const topOptionsPanelWarm = JSON.stringify(topOptions[2]) !== JSON.stringify(topOptions[0]) ? 
        <div className="clothes-container">
            <span>Something Warmer: </span>{" "}
            {topOptions[2].map(
                (clothes: Clothes, idx: number) => (
                    <Fragment key={idx}>
                        <ClothesFaceout name={clothes.name} warmth={clothes.warmth}/>
                        {" + "}
                    </Fragment>
                ))}
            <ClothesFaceout name={bottomOptions[2].name} warmth={bottomOptions[2].warmth} />
        </div>
        : null;

    return <div>
        {topOptionsPanel}
        {topOptionsPanelCool}
        {topOptionsPanelWarm}
    </div>
})

export default ClothesBlock;
