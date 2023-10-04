import React from 'react'

interface CardProps {
    img: string;
    name: string;
    id: string;
    price: number;
    link: string;
}

export default function Card({ img, name, id, price, link }: CardProps) {
    return (
        <a target="_blank" rel="noopener noreferrer" href={link}>
            <div className='bg-grayCard rounded-lg transition-all ease-in-out duration-300 hover:bg-grayBg'>
                <img src={img} alt={name} className='rounded-t-lg' />
                <div className='flex flex-col gap-3 p-4 font-bold'>
                    <p>{name}</p>
                    <p>{price} ETH</p>
                </div>
            </div>
        </a>
    )
}
