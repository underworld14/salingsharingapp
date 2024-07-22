import { Home, Notebook, ArrowRightLeft, Settings, DoorOpen } from 'lucide-svelte';

export const sidebarMenus = [
	{
		name: 'Dashboard',
		icon: Home,
		href: '/'
	},
	{
		name: 'Kelas & Kursus',
		icon: Notebook,
		href: '/courses'
	},
	{
		name: 'Transaksi',
		icon: ArrowRightLeft,
		href: '/transactions'
	},
	{
		name: 'Pengaturan',
		icon: Settings,
		href: '/settings'
	},
	{
		name: 'Keluar',
		icon: DoorOpen,
		href: '/logout'
	}
];
