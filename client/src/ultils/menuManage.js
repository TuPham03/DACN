import icons from "./icons"

const { TbPencilPlus, MdOutlineLibraryBooks, BiUserPin } = icons

const menuManage = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <TbPencilPlus />
    },
    {
        id: 2,
        text: 'Quản lý tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <MdOutlineLibraryBooks />,
    },
    {
        id: 4,
        text: 'Thông tin tài khoản',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <BiUserPin />
    },
]

export default menuManage