import React from 'react';
import Currencies from '../currencies/Currencies';
import Orders from '../orders/Orders';
import Templates from '../templates/Templates';

const Home = () => {
    return (
        <>
            <div className="text-center">
                <h2>Orders</h2>
                <Orders />
            </div>
        </>
    );
}

export default Home;