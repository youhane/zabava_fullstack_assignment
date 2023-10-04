"use client"

import Card from "@/components/Card";
import axios from "axios";
import { useEffect, useState } from "react"

interface NFTProps {
  image_url: string;
  name: string;
  token_id: string;
  identifier: string;
  metadata_url: string;
}

export default function Home() {
  const [collectionName, setCollectionName] = useState("piratenation")
  const [NFTS, setNFTS] = useState<NFTProps[]>([]);
  const [floorPrice, setFloorPrice] = useState(0);

  useEffect(() => {
    const NFT_REQUEST = {
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_OPENSEA_API_BASE_URL}v2/collection/${collectionName}/nfts`,
      params: { limit: '50' },
      headers: { accept: 'application/json', 'X-API-KEY': process.env.NEXT_PUBLIC_OPENSEA_API_KEY }
    };

    axios
      .request(NFT_REQUEST)
      .then(function (response) {
        console.log(response.data.nfts)
        setNFTS(response.data.nfts)
      })
      .catch(function (error) {
        alert(error)
      });

    const FLOORPRICE_REQUEST = {
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_OPENSEA_API_BASE_URL}api/v1/collection/${collectionName}/stats`,
      headers: { accept: 'application/json', 'X-API-KEY': process.env.NEXT_PUBLIC_OPENSEA_API_KEY }
    };

    axios
      .request(FLOORPRICE_REQUEST)
      .then(function (response) {
        setFloorPrice(response.data.stats.floor_price)
      })
      .catch(function (error) {
        alert(error)
      });
  }, [])

  return (
    <main className="flex min-h-screen flex-col gap-10 items-center justify-between py-14 px-8 md:px-10 xl:px-24 bg-grayBg">
      <h1 className="text-3xl xl:text-4xl text-center font-extrabold drop-shadow-glow">Collection Name: {collectionName}</h1>
      <div className="bg-blackGrid grid min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5 p-10">
        {NFTS.map((nft) => {
          return <Card
            key={nft.identifier}
            img={nft.image_url}
            name={nft.name}
            id={nft.identifier}
            price={floorPrice}
            link={nft.metadata_url}
          />
        })}
      </div>
    </main>
  )
}
