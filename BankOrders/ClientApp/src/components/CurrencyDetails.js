import React from "react";

const CurrencyDetails = ({
    currency,
}) => {
    return (
        <tr>
            <td>
                currency.Code
            </td>
            <td>
                currency.ExchangeRate
            </td>
            <td>
                <a className="nav-link text-danger">X</a>
            </td>
        </tr>
    );
}

export default CurrencyDetails;