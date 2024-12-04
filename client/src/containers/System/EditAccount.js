import React, { useState } from 'react'
import { InputReadOnly, InputFormV2, Button } from '../../components'
import anonavatar from '../../assets/anon-avatar.png'
import { useSelector, useDispatch } from 'react-redux'
import { apiUploadImages, apiUpdateUser } from '../../services'
import { fileToBase64, blobToBase64 } from '../../ultils/Common/tobase64'
import { getCurrent } from '../../store/actions'
import Swal from 'sweetalert2'


const EditAccount = () => {

    const { currentData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        name: currentData?.name || '',
        avatar: blobToBase64(currentData?.avatar) || '',
        fbUrl: currentData?.fbUrl || '',
        zalo: currentData?.zalo || '',
    })

    //ham submit
    const handleSubmit = async () => {
        const response = await apiUpdateUser(payload)
        if (response?.data.err === 0) {
            Swal.fire('Done', 'Chỉnh sửa thông tin cá nhân thành công', 'success').then(() => {
              dispatch(getCurrent());
            });
          } else {
            Swal.fire('Oops!', 'Chỉnh sửa thông tin cá nhân không thành công', 'error');
          }
          
    }

    //ham layfile
    const handleUploadFile = async (e) => {
        const imageBase64 = await fileToBase64(e.target.files[0]);
        setPayload((prev) => ({
            ...prev,
            avatar: imageBase64
          }));
    }


    return (
        <div className='flex flex-col h-full items-center'>
            <h1 className="text-3xl w-full text-start font-medium py-4 border-b border-gray-200">Cập nhật thông tin cá nhân</h1>
            <div className='w-3/5 flex items-center justify-center'>
                <div className='py-6 flex flex-col gap-4 w-full'>
                <InputReadOnly value={`#${currentData?.id?.match(/\d/g).join('').slice(0, 6)}` || ''}direction='flex-row'label='Mã thành viên'/>
                    <InputReadOnly value={currentData?.phone} editPhone direction='flex-row' label="Số điện thoại" />
                    <InputFormV2
                        name='name'
                        setValue={setPayload}
                        direction='flex-row'
                        value={payload.name}
                        label="Tên hiển thị"
                    />
                    <InputFormV2
                        name='zalo'
                        setValue={setPayload}
                        direction='flex-row'
                        value={payload.zalo}
                        label="Zalo"
                    />
                    <InputFormV2
                        name='fbUrl'
                        setValue={setPayload}
                        direction='flex-row'
                        value={payload.fbUrl}
                        label="Facebook" />
                    <div className='flex'>
                        <label className='w-48 flex-none' htmlFor='password'>Mật khẩu</label>
                        <small className='flex-auto text-blue-500 h-12 cursor-pointer'>Đổi mật khẩu</small>
                    </div>
                    <div className='flex mb-6'>
                        <label className='w-48 flex-none' htmlFor='avatar'>Ảnh đại diện</label>
                        <div>
                            <img src={payload?.avatar || anonavatar} alt='avatart' className='w-28 h-28 rounded-full object-cover' />
                            <input onChange={handleUploadFile} type='file' className='appearance-none my-4' id='avatar'></input>
                        </div>
                    </div>
                    <Button
                        text='Cập nhật'
                        bgColor='bg-blue-600'
                        textColor="text-white"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditAccount