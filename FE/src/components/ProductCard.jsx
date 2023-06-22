import React from "react";

function ProductCard(props) {
  return (
    <>
      <div className="w-48 h-48 p-2 flex flex-col justify-between rounded bg-white">
        <div id="product__image" className="h-24">
          <img
            src={props.image}
            alt={props.name}
            className="object-cover w-full rounded"
          />
        </div>
        <div id="product__details" className="bg-black/70 text-white h-auto p-2 rounded-b">
          <h2 className="text-sm font-bold">{props.name}</h2>
          <p className="text-sm">{"Rp." + props.price}</p>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
