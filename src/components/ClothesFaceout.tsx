import React from 'react';

import { Clothes } from '../model/model';
import '../styles/clothes.css';

const ClothesFaceout = ({ name }: Clothes) => {
    return <span className="clothes">{name}</span>;
};

export default ClothesFaceout;
