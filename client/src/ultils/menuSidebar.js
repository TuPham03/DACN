import icons from './icons'

const { TbPencilPlus, MdOutlineLibraryBooks, BiUserPin } = icons

const memuSidebar = [
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
        icon: <MdOutlineLibraryBooks />
    },
    {
        id: 4,
        text: 'Sửa thông tin cá nhân',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <BiUserPin />
    },
    {
        id: 5,
        text: 'Liên hệ',
        path: '/lien-he',
        icon: <BiUserPin />
    },
    {
        id: 6,
        text: 'Quản lí tất cả bài đăng',
        path: '/he-thong/quan-li-tat-ca-bai-dang',
        icon: <BiUserPin />
    }
]

export default memuSidebar