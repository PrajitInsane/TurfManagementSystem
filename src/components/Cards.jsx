import React from 'react';

const Cards = ({ id,name, location, contact,image,email}) => {
  return (
    <div className="hover:bg-gray-900 border rounded shadow-md h-auto w-full  mx-3 p-9">
        <div className='flex justify-center'>
        <img src={image} alt="" className='pb-6 rounded w-8/12 ml-6' />
        </div>
      <h2 className="text-3xl flex justify-center font-bold text-purple-700">{name}</h2>
      <p className="text-purple-300 flex justify-center">Location: {location}</p>
      <p className="text-purple-300 flex justify-center">Contact: {contact}</p>
      <p className="text-purple-300 flex justify-center">Email: {email}</p>

    </div>
  );
};

export default Cards;
