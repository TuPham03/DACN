import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import moment from 'moment'
import { Button, UpdatePost } from '../../components'
import { apiDeletePost } from '../../services'
import Swal from 'sweetalert2'
export default function ManageAllAccount(){
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const { posts, dataEdit } = useSelector(state => state.post)
    const [updateData, setUpdateData] = useState(false)
    const [postss, setPosts] = useState([])
    const [status, setStatus] = useState('0')

    useEffect(() => {
        !dataEdit && dispatch(actions.getPosts())
    }, [dataEdit, updateData])

    useEffect(() => {
        !dataEdit && setIsEdit(false)
    }, [dataEdit])

    useEffect(() => {
        setPosts(posts)
    }, [posts])

    const checkStatus = (dateString) => {
        return moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(new Date().toDateString())
    }

    const checkTimeDateNow = (t) => {
        return t > Date.now();
    }
    //deleted post
    const handleDeletePost = async (postId) => {
        const response = await apiDeletePost(postId)
        if (response?.data.err === 0) {
            setUpdateData(prev => !prev)
        } else {
            Swal.fire('Thông báo', 'Xóa bài viết thất bại!', 'error')
        }
    }

    //filter post
    useEffect(() => {
        if (status === 1) {
            const activePost = posts?.filter(item => checkTimeDateNow(item?.vipCost_time))
            setPosts(activePost)
        } else if (status === 2) {
            const expiredPost = posts?.filter(item => !checkTimeDateNow(item?.vipCost_time))
            setPosts(expiredPost)
        } else {
            setPosts(posts)
        }

    }, [status])

    return (
        <div className='flex flex-col gap-6 '>
            <div className='py-4 border-b border-gray-200 flex items-center justify-between'>
                <h1 className="text-3xl font-medium">Quản lý tin đăng</h1>
                <select onChange={e => setStatus(+e.target.value)} value={status} className='outline-none border p-2 border-gray-200 rounded-md'>
                    <option value="0">Lọc theo trạng thái</option>
                    <option value="1">Đang hoạt động</option>
                    <option value="2">Đã hết hạn</option>
                </select>
            </div>
            <table className="w-full table-auto">
                <thead>
                    <tr className='flex w-full bg-blue-500 text-white'>
                        <th className='border flex-1 p-2'>Mã tin</th>
                        <th className='border flex-1 p-2'>Ảnh đại diện</th>
                        <th className='border flex-1 p-2'>Tiêu đề</th>
                        <th className='border flex-1 p-2'>Giá</th>
                        <th className='border flex-1 p-2'>Ngày bắt đầu</th>
                        <th className='border flex-1 p-2'>Ngày hết hạn</th>
                        <th className='border flex-1 p-2'>Trạng thái</th>
                        <th className='border flex-1 p-2'>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {!postss
                        ? <tr>
                            <td>
                                asdasd
                            </td>
                        </tr>
                        : postss?.map(item => {
                            return (
                                <tr className='flex items-center h-16' key={item.id}>
                                    <td className='border px-2 flex-1 h-full flex justify-center items-center'>{item?.overviews?.code}</td>
                                    <td className='border px-2 flex-1 h-full flex justify-center items-center'>
                                        <img src={JSON.parse(item?.images?.image)[0] || ''} alt='avatar-post' className='w-10 h-10 object-cover rounded-md'></img>
                                    </td>
                                    <td className='border px-2 flex-1 h-full flex justify-center items-center '>{`${item?.title?.slice(0, 30)}...`}</td>
                                    <td className='border px-2 flex-1 h-full flex justify-center items-center '>{item?.attributes?.price}</td>
                                    <td className='border px-2 flex-1 h-full flex justify-center items-center'>{item?.overviews?.created}</td>
                                    <td className='border px-2 flex-1 h-full flex justify-center items-center '>{item?.overviews?.expired}</td>
                                    <td className='border px-2 flex-1 h-full flex justify-center items-center '>
                                        {checkTimeDateNow(item?.vipCost_time) ? 'Đang hoạt động' : 'Đã hết hạn'}
                                    </td>
                                    <td className='border px-2 flex-1 h-full flex justify-center items-center gap-4'>
                                        <Button
                                            text='Sửa'
                                            bgColor='bg-green-600'
                                            textColor='text-white'
                                            onClick={() => {
                                                dispatch(actions.editData(item))
                                                setIsEdit(true)
                                            }}
                                        />
                                        <Button
                                            text='Xóa'
                                            bgColor='bg-orange-600'
                                            textColor='text-white'
                                            onClick={() => handleDeletePost(item.id)}
                                        />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
        </div>
    )
}