// Icons
import { useRouter } from 'next/navigation';
import {
  BiBell,
  BiEnvelope,
  BiHome,
  BiPyramid,
  BiSearch,
} from 'react-icons/bi';

interface MobileAppBarProps {
  pathname: string;
}
export default function MobileAppBar({ pathname }: MobileAppBarProps) {
  const router = useRouter();

  // Map over menu items and render each item
  return (
    <div className='fixed bottom-0 z-30 '>
      <div className='md:hidden h-[70px] flex items-center relative z-50'>
        <div className='relative flex flex-row justify-between w-screen px-4 pb-2 bg-opacity-50 border-t rounded backdrop-blur-lg drop-shadow-lg border-grayBorder bg-blackBG'>
          {menuItems.map((item, index) => {
            const isActive = pathname === item.link; // Check if the current path matches the item's link.
            return (
              <div
                className='flex items-center py-4 cursor-pointer group'
                key={index}
                data-te-toggle='tooltip'
                title={item.tooltip}
                onClick={() => {
                  router.push(`${item.link}`, { scroll: true });
                }}
              >
                <button
                  className={`flex flex-col items-center w-10 p-1 transition-all duration-300 ease-in-out rounded-full text-white group-hover:text-secondary ${
                    isActive ? 'text-secondary' : ''
                  }`}
                >
                  <item.icon className='text-2xl ' />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Menu items configuration
const menuItems = [
  { icon: BiHome, title: 'Home', tooltip: 'Home', link: '/app' },
  { icon: BiPyramid, title: 'web3', tooltip: 'web3', link: '/app/web3' },
  { icon: BiSearch, title: 'Search', tooltip: 'Search', link: '/app/search' },
  {
    icon: BiBell,
    title: 'Notification',
    tooltip: 'Notifications',
    link: '/app/notifications',
  },
  {
    icon: BiEnvelope,
    title: 'Messages',
    tooltip: 'Messages',
    link: '/app/messages',
  },
];
