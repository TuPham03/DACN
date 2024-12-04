import React, { memo, useState } from 'react'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString'
import { path } from '../ultils/constant'


let ChangeTitle = (html, content) => {

    console.log(html)
    html = html.replaceAll("{0}", content);
    console.log(html)
    return html;
}


const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons
// const indexs = [0, 1, 2, 3]
const Item = ({ images, user, title, star, description, attributes, address, id, htmlData }) => {
    const [isHoverHeart, setIsHoverHeart] = useState(false);

    const htmlCode = ChangeTitle(htmlData.html, title);

 

    return (
        <div className='w-full flex border-t border-orange-600 py-4'>
            <Link
                to={`${path.DETAIL}${formatVietnameseToString(title?.replaceAll('/', ''))}/${id}`}
                className='w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer'
            >
                {images.length > 0 && images.filter((i, index) => [...Array(4).keys()].some(i => i === index))?.map((i, index) => {
                    return (
                        <img key={index} src={i} alt="preview" className='w-[47%] h-[120px] object-cover' />
                    )
                })}
                <span className='bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-4'>{`${images.length} ảnh`}</span>

                <span
                    className='text-white absolute right-5 bottom-1'
                    onMouseEnter={() => setIsHoverHeart(true)}
                    onMouseLeave={() => setIsHoverHeart(false)}
                >
                    {isHoverHeart ? <RiHeartFill size={26} color='red' /> : <RiHeartLine size={24} />}

                </span>

            </Link>
            <div className='w-3/5'>
                <div className='flex justify-between gap-4 w-full'>
                    <Link to={`${path.DETAIL}${formatVietnameseToString(title?.replaceAll('/', ''))}/${id}`} >
                    
                      


<div dangerouslySetInnerHTML={{__html: htmlCode}} />


                    </Link>
                    <div className='w-[10%] flex justify-end'>

                        { (htmlData.top >=1 ? <BsBookmarkStarFill size={24} color='orange' /> : "") }

                    </div>
                </div>
                <div className='my-2 flex items-center justify-between gap-2'>
                    <span className='font-bold flex-3 text-green-600  whitespace-nowrap overflow-hidden text-ellipsis'>{attributes?.price}</span>
                    <span className='flex-1'>{attributes?.acreage}</span>
                    <span className='flex-3 whitespace-nowrap overflow-hidden text-ellipsis'>
                        {`${address.split(',')[address.split(',').length - 2]}${address.split(',')[address.split(',').length - 1]}`}
                    </span>
                </div>
                <p className='text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden'>
                    {description}
                </p>
                <div className='flex items-center my-5 justify-between'>
                    <div className='flex items-center'>
                        <img src='https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg' alt='avatar' className='w-[30px] h-[30px] object-cover rounded-full' />
                        <p>{user?.name}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <a className='bg-blue-700 text-white p-1 rounded-md'
                        href="/" //tel: sdt muon goi
                        target='_blank'
                        > 
                            {`Gọi ${user?.phone}`}
                        </a>
                        <a
                        className='text-blue-700 px-1 rounded-md border border-blue-700'
                        href={`https://zalo.me/${user?.zalo}`}
                        target='_blank'
                        >
                        Nhắn Zalo</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Item)