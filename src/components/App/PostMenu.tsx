import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiShareAlt, BiLink, BiBlock, BiFlag } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import {
  deleteUserPost,
  fetchUserPosts,
} from '@/lib/redux/slices/UserPostSlice';
import { fetchUserById } from '@/lib/redux/slices/userSlice';
import { useEffect, useRef } from 'react';

const menuItemsConfig = [
  {
    icon: <RiDeleteBin6Line className='text-secondary' />,
    text: `Delete`,
    requiresAuth: true,
  },
  { icon: <BiShareAlt />, text: 'Share post via...' },
  { icon: <BiLink />, text: 'Copy post URL' },
  { icon: <BiBlock />, text: `Hide Post ` },
  { icon: <BiFlag />, text: `Report ` },
];

export default function PostMenu({ menuOpen, setMenuOpen, post, id }) {
  const authUser = useSelector((state: RootState) => state.auth?.user);
  const dispatch = useDispatch<AppDispatch>();
  const menuRef = useRef(null);

  const menuItems = menuItemsConfig.filter((item) => {
    if (item.requiresAuth && authUser?._id !== post.author._id) {
      return false;
    }
    return true;
  });

  const handleDelete = async () => {
    dispatch(deleteUserPost(post._id));
  };

  useEffect(() => {
    dispatch(fetchUserPosts());
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setMenuOpen]);

  return (
    <div
      ref={menuRef}
      id='dropdownDotsHorizontal'
      className={`z-10 ${
        menuOpen ? 'block' : ' hidden'
      } absolute bg-blackBG divide-y top-0 rounded-lg shadow shadow-gray-500 right-0 w-[250px]`}
    >
      <ul
        className='text-base text-white'
        aria-labelledby='dropdownMenuIconHorizontalButton'
      >
        {menuItems.map((item, index) => (
          <li
            onClick={() => {
              if (item.text === 'Delete') {
                handleDelete();
              }
            }}
            key={index}
            className={`flex justify-start items-center cursor-pointer px-4 text-start py-2 hover:bg-[#272727]  text-white w-full }`}
          >
            {item.icon}
            <span
              className={`ml-2 font-semibold  ${
                item.text === 'Delete' ? 'text-secondary' : 'text-white'
              }`}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
