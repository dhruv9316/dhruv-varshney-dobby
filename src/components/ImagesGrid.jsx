import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ImagesGrid = ({filteredImages, images}) => {

  return (
    // {/* filteredImages && filteredImages.length > 0 */}
    <div className='flex flex-wrap' >
        {
            filteredImages && filteredImages.length > 0
            ?
            filteredImages.map((item, idx) => (
                <div key={idx} className='flex flex-col m-4 rounded-md shadow-lg gap-3 p-2 hover:scale-[103%] hover:cursor-pointer'>
                    <img src={item.img} alt={`img-${idx}`} className="w-[10rem] aspect-square object-contain" />
                    <p>{item.img_name}</p>
                </div>
            ))
            :
            images.length > 0
            ?
            <div>
                No Images Found!
            </div>
            :
            <div>
                No Images Uploaded Yet !
            </div>
        }
    </div>
  )
}

export default ImagesGrid