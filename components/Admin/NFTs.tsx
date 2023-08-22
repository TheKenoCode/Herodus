import React, { useState } from 'react'
import nftImg from '../../public/assets/herocard.png'
import Image from 'next/image'

interface Props {
  // define your props here if necessary
}

const NFTs: React.FC<Props> = (props) => {
  const [searchTerm, setSearchTerm] = useState('')

  // Sample NFT data. In a real-world scenario, this would be fetched from an API.
  const nfts = [
    {
      id: 1,
      title: 'Digital Artwork',
      artist: 'John Doe',
      price: '1.5 ETH',
      thumbnail: 'path/to/image1.jpg',
    },
    {
      id: 2,
      title: 'Virtual Landscape',
      artist: 'Jane Smith',
      price: '2 ETH',
      thumbnail: 'path/to/image2.jpg',
    },
    // ... add more sample data as needed
  ]

  const filteredNFTs = nfts.filter(
    (nft) =>
      nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.artist.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="h-screen p-8 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold">NFT Management</h1>

      <input
        type="text"
        placeholder="Search by title or artist..."
        className="w-full p-2 mb-6 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredNFTs.map((nft) => (
          <div key={nft.id} className="p-4 bg-white rounded shadow">
            <Image
              src={nftImg}
              alt={nft.title}
              className="object-cover w-full h-40 mb-4 rounded"
            />
            <h3 className="text-lg font-bold">{nft.title}</h3>
            <p>Artist: {nft.artist}</p>
            <p>Price: {nft.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NFTs
