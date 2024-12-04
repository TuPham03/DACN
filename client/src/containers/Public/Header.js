import React, { useCallback, useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo-phongtro.png';
import { Button, User } from '../../components';
import icons from '../../ultils/icons';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { path } from '../../ultils/constant';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import menuManage from '../../ultils/menuManage';

const { AiOutlinePlusCircle, BiLogOut, BsChevronDown } = icons;

const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [isShowMenu, setIsShowMenu] = useState(false);
  const dispatch = useDispatch();
  const headerRef = useRef();

  const goLogin = useCallback(
    (flag) => {
      navigate(path.LOGIN, { state: { flag } });
    },
    [navigate]
  );

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchParams]);

  return (
    <div ref={headerRef} className="w-3/5">
      <div className="max-full flex items-center justify-between">
        {/* Logo */}
        <Link to={'/'}>
          <img
            src={logo}
            alt="logo"
            className="w-[240px] h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          {/* Hiển thị nếu chưa đăng nhập */}
          {!isLoggedIn && (
            <div className="flex items-center gap-1">
              <small>Phongtro123.com xin chào!</small>
              <Button
                text={'Đăng nhập'}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(false)}
              />
              <Button
                text={'Đăng ký'}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(true)}
              />
            </div>
          )}

          {/* Hiển thị nếu đã đăng nhập */}
          {isLoggedIn && (
            <div className="flex items-center gap-3 relative">
              <User />
              <Button
                text={'Quản lý tài khoản'}
                textColor="text-white"
                bgColor="bg-blue-700"
                px="px-4"
                IcAfter={BsChevronDown}
                onClick={() => setIsShowMenu((prev) => !prev)}
              />
              {isShowMenu && (
                <div
                  className="absolute bg-white shadow-md rounded-md p-4 flex flex-col z-50"
                  style={{
                    top: '100%', // Hiển thị menu ngay bên dưới nút
                    left: '50%', // Căn giữa với nút
                    transform: 'translateX(25%)', // Căn chỉnh để menu thẳng hàng
                    width: '200px', // Đặt chiều rộng cố định
                  }}
                >
                  {/* Các mục trong menu */}
                  {menuManage.map((item) => (
                    <Link
                      className="hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-100 py-2"
                      key={item.id}
                      to={item?.path}
                    >
                      {item?.icon}
                      {item.text}
                    </Link>
                  ))}
                  {/* Nút đăng xuất */}
                  <span
                    className="cursor-pointer hover:text-orange-500 text-blue-500 py-2 flex items-center gap-2"
                    onClick={() => {
                      setIsShowMenu(false);
                      dispatch(actions.logout());
                    }}
                  >
                    <BiLogOut />
                    Đăng Xuất
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Nút Đăng tin mới */}
          <Button
            text={'Đăng tin mới'}
            textColor="text-white"
            bgColor="bg-secondary2"
            IcAfter={AiOutlinePlusCircle}
            onClick={() => navigate("/he-thong/tao-moi-bai-dang")}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
