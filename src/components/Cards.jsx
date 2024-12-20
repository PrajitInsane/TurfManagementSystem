import React from 'react';

const Cards = ({ id,name, location, contact,image,email}) => {
  return (
    <div className="hover:bg-gray-900 border rounded shadow-md h-auto w-full flex justify-between mx-3 p-9">
        <div className='flex justify-left'>
        <img src={image} alt="" className='pb-6 rounded w-6/12 ml-6' />
        </div>
      <div className='w-6/12 text-3xl '>
      <h2 className="font-bold text-4xl text-purple-700 ">{name}</h2>
      <p className="text-purple-300 ">Location: {location}</p>
      <p className="text-purple-300 ">Contact: {contact}</p>
      <p className="text-purple-300 ">Email: {email}</p>
      </div>
    </div>
  );
};

export default Cards;
