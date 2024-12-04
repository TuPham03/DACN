import React, { memo } from 'react';
import anonAvatar from '../assets/anon-avatar.png';
import icons from '../ultils/icons';

const { BsDot, BsTelephoneFill, SiZalo, CiFacebook } = icons;

const BoxInfo = ({ userData }) => {
  return (
    <div className="w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-4">
      <img src={anonAvatar} alt="avatar" className="w-16 h-16 object-contain rounded-full" />
      <h3 className="font-medium text-xl">{userData?.name}</h3>
      <span className="flex items-center">
        <BsDot color="green" size={28} />
        <span>Đang hoạt động</span>
      </span>
      <a
        className="bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg"
        href="/"
      >
        <BsTelephoneFill />
        {userData?.phone}
      </a>
      <a
        className="bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md font-bold text-lg"
        href={`https://zalo.me/${userData?.zalo}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiZalo color="blue" size={35} />
      </a>
      {userData?.fbUrl ? (
        <a
          className="bg-blue-600 py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg"
          href={userData?.fbUrl?.startsWith('http') ? userData.fbUrl : `https://facebook.com/${userData.fbUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <CiFacebook size={35} />
          Facebook
        </a>
      ) : (
        <div className="bg-gray-200 py-2 flex items-center justify-center gap-2 w-full rounded-md text-gray-600 font-bold text-lg">
          <CiFacebook size={35} />
          Không có thông tin
        </div>
      )}
    </div>
  );
};

export default memo(BoxInfo);
