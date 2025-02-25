import React, { Fragment, memo } from 'react';

import ClothesFaceout from './ClothesFaceout';
import { Clothes, TOPS, BOTTOMS, COMFORT, UNLAYERABLE_TOP_INDICIES } from './constants';
import { min, getWarmth } from '../service/utils.js';

import '../styles/clothes.css';

type ClothesBlockProps = {
    highTemperature: number;
    lowTemperature: number;
    feelsLikeTemperature: number;
    suggestionTrigger: boolean;
};

const ClothesBlock = memo(
    ({ highTemperature, lowTemperature, feelsLikeTemperature }: ClothesBlockProps) => {
        const minTemperature = min(feelsLikeTemperature, lowTemperature);
        const differences = [
            COMFORT - minTemperature,
            COMFORT - minTemperature - 7,
            COMFORT - minTemperature + 7
        ]; // Calculate for suggestions

        const getTops = () => {
            if (minTemperature > 74 || highTemperature > 88) {
                return [[TOPS[0]], [TOPS[0]], [TOPS[0]]];
            }

            console.log(differences);
            const options = differences
                .map((diff) => getOptions(diff))
                .sort((a, b) => getWarmth(a) - getWarmth(b)); // Ensure goes by Reg - Cool - Warm

            return [options[1], options[0], options[2]].map((option) =>
                option.map((idx) => TOPS[idx])
            );
        };

        const getLayers = (temperatureDifference) => {
            const possibleLayers: number[][] = [];

            const backtrack = (startIdx: number, currentIndices: number[], currentSum: number) => {
                if (Math.abs(currentSum - temperatureDifference) <= 2) {
                    possibleLayers.push([...currentIndices]);
                }

                for (let i = startIdx; i < TOPS.length; i++) {
                    backtrack(i + 1, [...currentIndices, i], currentSum + TOPS[i].warmth);
                }
            };

            backtrack(0, [], 0);

            console.log(temperatureDifference + '-' + possibleLayers);
            if (possibleLayers.length == 0) {
                return [];
            }

            return possibleLayers[Math.floor(Math.random() * possibleLayers.length)].sort();
        };

        const getOptions = (temperatureDifference) => {
            const removeUnlayerables = (options: number[]) => {
                const unlayerableItems = options.filter((num) =>
                    UNLAYERABLE_TOP_INDICIES.includes(num)
                );

                if (unlayerableItems.length > 1) {
                    // Only keep the heaviest layers
                    const heaviestTop = Math.max(...unlayerableItems);
                    options = options.filter(
                        (num) =>
                            num < UNLAYERABLE_TOP_INDICIES[UNLAYERABLE_TOP_INDICIES.length - 1] ||
                            num === heaviestTop
                    );

                    // Add back the warmest layerable
                    options.push(UNLAYERABLE_TOP_INDICIES[UNLAYERABLE_TOP_INDICIES.length - 1] - 1);
                }

                return options.sort();
            };

            const removeDuplicates = (options: number[]) => {
                const counts = new Map();
                const uniqueSet = new Set(options);

                // Count occurrences
                options.forEach((num) => {
                    counts.set(num, (counts.get(num) || 0) + 1);
                });

                // Add back the warmest option
                counts.forEach((count, num) => {
                    if (count > 1) {
                        uniqueSet.add(num - 1);
                    }
                });

                return Array.from(uniqueSet).sort();
            };

            let options = getLayers(temperatureDifference);
            options = removeUnlayerables(options);
            options = removeDuplicates(options);

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
            const getBottoms = (temperatureDifference) => {
                if (minTemperature > 68 || highTemperature > 78) {
                    return BOTTOMS[0];
                }

                if (temperatureDifference < 10) return BOTTOMS[0];
                if (temperatureDifference < 33) return BOTTOMS[1];
                return BOTTOMS[2];
            };

            return differences.map((diff) => getBottoms(diff));
        };

        const topOptions = getTops();
        const bottomOptions = getBottoms();

        console.log(topOptions[0]);
        console.log(topOptions[1]);
        console.log(topOptions[2]);

        const topOptionsPanel = (
            <div className="clothes-container">
                <span>Suggested: </span>{' '}
                {topOptions[0].map((clothes: Clothes, idx: number) => (
                    <Fragment key={idx}>
                        <ClothesFaceout name={clothes.name} warmth={clothes.warmth} />
                        {' + '}
                    </Fragment>
                ))}
                <ClothesFaceout name={bottomOptions[0].name} warmth={bottomOptions[0].warmth} />
            </div>
        );

        const topOptionsPanelCool =
            topOptions[1].length !== 0 &&
            JSON.stringify(topOptions[1]) !== JSON.stringify(topOptions[0]) &&
            JSON.stringify(topOptions[1]) !== JSON.stringify(topOptions[2]) ? (
                <div className="clothes-container">
                    <span>Something Cooler: </span>{' '}
                    {topOptions[1].map((clothes: Clothes, idx: number) => (
                        <Fragment key={idx}>
                            <ClothesFaceout name={clothes.name} warmth={clothes.warmth} />
                            {' + '}
                        </Fragment>
                    ))}
                    <ClothesFaceout name={bottomOptions[1].name} warmth={bottomOptions[1].warmth} />
                </div>
            ) : null;

        const topOptionsPanelWarm =
            topOptions[2].length !== 0 &&
            JSON.stringify(topOptions[2]) !== JSON.stringify(topOptions[0]) ? (
                <div className="clothes-container">
                    <span>Something Warmer: </span>{' '}
                    {topOptions[2].map((clothes: Clothes, idx: number) => (
                        <Fragment key={idx}>
                            <ClothesFaceout name={clothes.name} warmth={clothes.warmth} />
                            {' + '}
                        </Fragment>
                    ))}
                    <ClothesFaceout name={bottomOptions[2].name} warmth={bottomOptions[2].warmth} />
                </div>
            ) : null;

        return (
            <div>
                {topOptionsPanel}
                {topOptionsPanelCool}
                {topOptionsPanelWarm}
            </div>
        );
    }
);

export default ClothesBlock;
